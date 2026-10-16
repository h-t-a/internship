# Pillar 2: Customer & Admin Authentication Blueprint
> **MFS Digital Banking Internship 2026** | Software Development Department (SDD)  
> **Topic:** Customer & Admin Authentication, OTP Verification, JWT Access Tokens, and Refresh Tokens  
> **Target Repositories:** [`adminConsole_repo`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo), [`iAM_repo`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iAM_repo), [`iBanking_repo`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iBanking_repo)

---

## 1. Executive Architecture Overview

In digital banking systems, security boundaries separate **Identity Management** (validating who the user is) from **Core Banking Operations** (initiating funds transfers, checking account limits, and performing administrative interventions). 

To achieve high security and maintain separation of concerns, the system adopts a **Dual-Token Microservice Architecture**:

```
+---------------------------------------------------------------------------------------------------+
|                                          CLIENT TIER                                              |
|            +------------------------------------+   +-------------------------------------+       |
|            |     iBanking Portal (Customer)     |   |   Admin Console SPA (Back-Office)   |       |
|            |  Angular 17+ (Retail / Corporate)  |   |  Angular 11+ Workspace              |       |
|            |  - projects/iam (Login & OTP)      |   |  - projects/iam (Login & OTP)       |       |
|            |  - projects/ibanking (Customer UI) |   |  - projects/ibanking-admin (Admin)  |       |
|            +------------------+-----------------+   +------------------+------------------+       |
+-------------------------------|----------------------------------------|--------------------------+
                                |                                        |
      (1) Signin / OTP Challenge|atoken        (1) Signin / OTP Challenge|atoken
                                v                                        v
+---------------------------------------------------------------------------------------------------+
|                            IDENTITY & ACCESS MANAGEMENT (IAM) SERVICE                             |
|  - Repository: iAM_repo/ibanking_iam (Azure Functions Java 17 + Cosmos DB)                        |
|  - Endpoints: /getKey (RSA), /signin (Credential Validation), /verifyuser (OTP Verification)      |
|  - Token Issuance: atoken (Authentication JWT, 365-day Cookie wrapper, 5-min sliding renewal)     |
|  - Multi-Factor: GatewayUtil.sendOTP() via YDNB SMS Gateway                                       |
+---------------------------------------------------------------------------------------------------+
                                |                                        |
                (2) Exchange atoken for btoken           (2) Exchange atoken for btoken
                                v                                        v
+------------------------------------+   +----------------------------------------------------------+
|     ibanking17 (Customer Backend)  |   |            admin_console (Back-Office Backend)           |
|  - Azure Functions (Java 17)       |   |  - Azure Functions (Java 17)                             |
|  - /getmoduletoken                 |   |  - /getmoduletoken (GetModuleTokenLogic.java)            |
|  - Validates atoken with IAM       |   |  - Validates atoken with IAM via /checktoken             |
|  - Exchanges Core Banking apiToken |   |  - Requests Core Banking apiToken (cid: 0000000000)      |
|  - Issues Customer btoken          |   |  - Issues Admin btoken (8h 20m validity, sid tracking)   |
+------------------------------------+   +----------------------------------------------------------+
                                |                                        |
                                +-------------------+--------------------+
                                                    |
                                                    v (3) Authenticated Business Requests (Bearer btoken)
+---------------------------------------------------------------------------------------------------+
|                                    PERSISTENCE & CORE SYSTEMS                                     |
|  - PostgreSQL cleandb (Schema: adminchannel) -> admin_user, roles, permissions                    |
|  - Session Storage -> loginuser (sid tracking, concurrent session invalidation)                   |
|  - Audit Log -> userhistory (tracks Action.RequestToken, Actor, IP, Delta)                        |
|  - Core Banking System (CBS) -> Account Balance, Statements, Operational Limits                   |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. The Dual-Token Architecture (`atoken` vs `btoken`)

A foundational pattern interns must understand is the distinct division of responsibility between the two tokens:

| Dimension | `atoken` (Authentication Token) | `btoken` (Banking / Business Session Token) |
| :--- | :--- | :--- |
| **Issuing Authority** | **IAM** ([`ibanking_iam`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iAM_repo/ibanking_iam)) | **Admin Console Backend** ([`admin_console`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console)) |
| **Client Storage** | Browser Cookie (`cookieService.set('atoken')`) | Local Storage (`localStorage.setItem('btoken')`) |
| **Token Lifespan** | • Default: 1 Hour<br>• Remember Me: 30 Days<br>• Cookie Wrapper: 365 Days<br>• Sliding Refresh: 5-minute loop via `checkToken()` | • Default: 8 Hours 20 Minutes (Configurable in `local.settings.json`) |
| **Primary Scope** | **Identity Proof**:<br>Validates that the user has successfully cleared password and multi-factor OTP verification. Cannot directly invoke banking operations. | **Operational Authorization**:<br>Encapsulates the Core Banking `apiToken`, Session ID (`sid`), Branch Code, and User Role. Required for all business APIs. |
| **Payload Claims** | `sub` (User ID), `iss`, `iat`, `exp` | `sub` (User ID), `phone`, `apiToken` (CBS), `sid` (Session ID), `branchCode` |

![Token Lifecycle Architecture](assets/iam_token_lifecycle_diagram_1791865353687.jpg)

---

## 3. Step-by-Step Lifecycle & Workflow

### Flow 1: Primary Authentication & Credential Exchange

```mermaid
sequenceDiagram
  autonumber
  actor User as Administrator / Customer
  participant SPA as Admin Console SPA (projects/iam)
  participant IAM as IAM Backend (ibanking_iam)
  participant SMS as SMS Gateway (smsgateway)
  participant DB as IAM Cosmos DB

  User->>SPA: 1. Input User ID & Password
  SPA->>IAM: GET /getKey (Request RSA Public Key)
  IAM-->>SPA: 200 OK {key: RSA_PUBLIC_KEY}
  Note over SPA: Encrypts Password using RSA Public Key (JSEncrypt)<br/>Generates client UUID via uuidv5
  SPA->>IAM: POST /signin {userid, password(RSA), appid: "ibankingac", uuid, remember}
  IAM->>IAM: RSAUtil.decryptBase64(password)
  IAM->>DB: UserDao.signInbyIDPW(userid, password)
  
  alt Credentials Invalid
    IAM-->>SPA: 401 Unauthorized ("Wrong Password or User ID")
  else MFA Enabled (Type 1: SMS / Email OTP)
    IAM->>DB: Check OTP rate limit (otptimelimit / otpallowcount)
    IAM->>SMS: GatewayUtil.sendOTP(mobile, description)
    SMS-->>User: 6-Digit OTP SMS
    IAM-->>SPA: 200 OK {returncode: "300", type: 1, session: otpsession, timeout: 3}
    SPA->>SPA: Navigate to #/iam/verify
  else MFA Disabled (Type 0)
    IAM-->>SPA: 200 OK {returncode: "300", type: 0, atoken: JWT}
    SPA->>SPA: Save atoken to Cookie & start checkToken() loop
    SPA->>SPA: Navigate to /main
  end
```

#### Codebase References:
* **Frontend Login Component**: [`projects/iam/src/app/login/login.component.ts:L64-L114`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa/projects/iam/src/app/login/login.component.ts#L64-L114)
  * `loginUser()`: Requests the RSA key and encrypts the password.
  * `goSignIn()`: Submits the payload to `/signin`. If `type == 1`, routes to `#/iam/verify`.
* **Backend Signin Function**: [`iAM_repo/ibanking_iam/src/main/java/com/function/Signin.java:L262-L308`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iAM_repo/ibanking_iam/src/main/java/com/function/Signin.java#L262-L308)
  * `goSignin()`: Decrypts password using RSA Private Key, validates identity against Cosmos DB.
  * `validateUser()`: Triggers OTP dispatch via the SMS Gateway.

---

### Flow 2: OTP Verification & `atoken` Generation

```mermaid
sequenceDiagram
  autonumber
  actor User as Administrator / Customer
  participant SPA as Admin Console SPA (verify.component.ts)
  participant IAM as IAM Backend (Verifyuser.java)
  participant SMS as SMS Gateway

  User->>SPA: 1. Enter 6-digit OTP into ng-otp-input
  SPA->>SPA: onOtpChange(otp) auto-triggers validateOtp() when length == 6
  SPA->>IAM: POST /verifyuser {userid, otp, session, appid, uuid, remember}
  IAM->>SMS: GatewayUtil.verifyOTP(mobile, description, otp, session)
  
  alt OTP Verification Successful
    SMS-->>IAM: 300 OK
    IAM->>IAM: TokenUtil.getToken(userid, appid, true, remember)
    IAM-->>SPA: 200 OK {returncode: "300", atoken: JWT, username, role}
    SPA->>SPA: Set Cookie "atoken" (365 days expiry)
    SPA->>SPA: Start 5-min sliding token refresh loop checkToken()
    SPA->>SPA: Navigate to /main/ibanking-admin/home
  else Invalid OTP or Expired
    SMS-->>IAM: 202 Error
    IAM-->>SPA: 202 {"Invalid OTP"}
    SPA->>SPA: Show error alert & clear OTP input fields
  end
```

#### Codebase References:
* **Frontend Verify Component**: [`projects/iam/src/app/verify/verify.component.ts:L125-L165`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa/projects/iam/src/app/verify/verify.component.ts#L125-L165)
  * `onOtpChange()`: Listens for digit input; when 6 digits are entered, immediately executes `validateOtp()`.
  * `resendOTP()`: Clears the countdown timer and requests a new OTP code.
* **Backend Verify Function**: [`iAM_repo/ibanking_iam/src/main/java/com/function/Verifyuser.java:L67-L122`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iAM_repo/ibanking_iam/src/main/java/com/function/Verifyuser.java#L67-L122)
  * `GatewayUtil.verifyOTP()`: Validates OTP against the SMS gateway session and issues a signed JJWT (`HS256`).

---

### Flow 3: Token Exchange - `atoken` to `btoken` (`getmoduletoken`)

```mermaid
sequenceDiagram
  autonumber
  participant SPA as Admin Console SPA (Navbar / Dashboard)
  participant AC as Admin Console Backend (GetModuleToken.java)
  participant IAM as IAM Backend (Checktoken.java)
  participant SQL as PostgreSQL / Azure SQL (adminchannel)
  participant CBS as Core Banking System (CBS API)

  SPA->>AC: POST /getmoduletoken {appid: "ibankingac", userid, atoken}
  Note over AC: Check atoken validity with IAM
  AC->>IAM: POST /checktoken {appid, atoken, userid}
  IAM-->>AC: returncode: "300" (Token Valid)
  
  AC->>SQL: UserDao.getUser(userid) -> phone, name, branchCode
  AC->>CBS: ApiUtil.getApiToken(phone, "0000000000")
  CBS-->>AC: Core Banking apiToken
  
  AC->>SQL: loginUser(userid) -> creates new Session ID (sid), revokes stale sessions
  AC->>AC: TokenUtil.getBToken(userid, appid, phone, apiToken, sid, branchCode)
  AC->>SQL: userhistory.saveUserHistory(Action.RequestToken, IP, details)
  
  AC-->>SPA: 200 OK {retcode: "300", btoken: JWT}
  SPA->>SPA: localStorage.setItem('btoken', btoken)
  SPA->>SPA: localStorage.setItem('lastActiveAt', now)
  SPA->>SPA: InActiveTimerService.refreshToken() loop starts
```

#### Codebase References:
* **Frontend Exchange Point**: [`admin_console_spa/src/app/navbar/navbar.component.ts:L153-L180`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa/src/app/navbar/navbar.component.ts#L153-L180)
  * `getModuleToken()`: Dispatches the `atoken` to the Admin Console backend to receive `btoken`.
* **Backend Token Exchange Handler**: [`admin_console/src/main/java/com/logic/GetModuleTokenLogic.java:L83-L145`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console/src/main/java/com/logic/GetModuleTokenLogic.java#L83-L145)
  * Obtains the core banking `apiToken`, creates an active session ID (`sid`) in the database, generates `btoken`, and records an immutable audit entry in `userhistory`.

---

### Flow 4: Business API Requests & Bearer Interceptor

```mermaid
sequenceDiagram
  autonumber
  participant SPA as Admin Console SPA (RestService)
  participant AC as Admin Console Functions (e.g. GetUsers, ToggleOtp)
  participant MW as AuthMiddleware.java
  participant DB as adminchannel.loginuser

  SPA->>AC: GET/POST /api/endpoint\nHeaders: Authorization: Bearer <btoken>
  AC->>MW: AuthMiddleware.isAuth(request)
  MW->>MW: Extract Bearer token from header
  MW->>MW: TokenUtil.isTokenExpired(btoken)
  
  alt Token is Expired
    MW-->>SPA: HTTP 200 {retcode: "401", retmessage: "Token Expired"}
  else Token Signature Invalid
    MW-->>SPA: HTTP 200 {retcode: "401", retmessage: "Unauthorized"}
  else Session Active & Valid
    MW->>MW: TokenUtil.getBTokenData(btoken)
    MW-->>AC: AuthData {isSuccess: true, tokenData}
    AC->>AC: Execute Business Operation (RBAC check, DB query)
    AC-->>SPA: 200 OK {retcode: "300", datalist: [...]}
  end
```

#### Codebase References:
* **Frontend HTTP Interceptor / RestService**: [`projects/ibanking-admin/src/app/services/rest.service.ts:L40-L48`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa/projects/ibanking-admin/src/app/services/rest.service.ts#L40-L48)
  * `getHeaders()`: Injects `'Authorization': 'Bearer ' + localStorage.getItem('btoken')` into every outgoing request.
* **Backend Auth Middleware**: [`admin_console/src/main/java/com/middlewares/AuthMiddleware.java:L16-L51`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console/src/main/java/com/middlewares/AuthMiddleware.java#L16-L51)
  * Validates token format, signature, expiration, and extracts claims.

---

### Flow 5: Silent Token Refresh & Sliding Session Renewal

To prevent active users from experiencing sudden session dropouts while avoiding indefinite session validity, background refresh loops are implemented:

```mermaid
graph TD
  subgraph atoken Refresh [IAM Sliding Renewal]
    A1[MainService.checkToken] -->|Every 5 Minutes| A2[HTTPService.doPost 'checktoken']
    A2 -->|IAM checktoken.java| A3[Validate Expiry & Refresh atoken]
    A3 -->|Return code 300| A4[Update Cookie 'atoken']
  end

  subgraph btoken Refresh [Admin Console Session Rotation]
    B1[InActiveTimerService] -->|Listen to mousemove| B2[Update lastActiveAt in localStorage]
    B3[Async Timeout Loop] -->|JWT_EXPIRES_IN minus 10s| B4{Active in last 5 mins?}
    B4 -->|Yes| B5[GET /refreshtoken?userid=]
    B5 -->|New btoken issued| B6[localStorage.setItem 'btoken']
    B6 -->|Loop| B3
    B4 -->|No / Inactive| B7[Trigger MainService.logout]
  end
```

#### Codebase References:
* **`atoken` Renewal**: [`admin_console_spa/src/app/main.service.ts:L85-L100`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa/src/app/main.service.ts#L85-L100)
* **`btoken` Renewal**: [`projects/ibanking-admin/src/app/services/inactivetimer.service.ts:L24-L44`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa/projects/ibanking-admin/src/app/services/inactivetimer.service.ts#L24-L44)

---

## 4. UI/UX Behavior & Visual Reference (Actual Running Admin Console)

These screenshots are captured directly from the running `admin_console_spa` instance (`projects/iam`).

### 1. Actual Sign-In Screen (`#/iam/login`)
![Actual Admin Console Sign In Screen](assets/actual_admin_login_screen.png)

* **Key Elements**:
  * **Brand Identity**: Authentic AGD Bank brand logo loaded dynamically via `assets/config.json`.
  * **User ID**: Clean text input with autofocus.
  * **Password Input**: Password field encrypted client-side using RSA public key before transmission.
  * **Forgot Password Link**: Routes directly to `#/iam/forgotpassword`.
  * **Sign In Action**: Styled primary button with interactive states (`.btn-primary`).

### 2. Actual Sign-In with Credentials Input
![Actual Admin Console Login Filled](assets/actual_admin_login_filled.png)

* **Form Validation**:
  * The **Sign In** button automatically activates when required fields are filled.
  * Passwords are typed as secure masked bullets, then transformed into base64 RSA encrypted text upon submission.

### 3. Actual OTP Verification Screen (`#/iam/verify`)
![Actual OTP Verification Screen](assets/actual_otp_verify_screen.png)

* **Key Elements**:
  * **Segmented OTP Input**: 6 separate digit boxes (`ng-otp-input`) with auto-advance and numeric-only filtering.
  * **Countdown Timer (`rtime`)**: Synchronized countdown timer initialized from `OTPTimeout` (e.g., `Time Remaining - 02:59`).
  * **Resend Action**: "Didn't get a verification code?" action link. Triggers `resendOTP()` and resets the timer loop.
  * **Auto-Submission**: When the 6th digit is typed, the component automatically invokes `validateOtp()` without requiring a manual click.

---

## 5. Security & Engineering Analysis for Interns

1. **Client-Side Credential Protection**:
   * Passwords are never sent across the network in plaintext. The frontend dynamically fetches the RSA public key (`getKey`) and encrypts credentials before dispatch.
2. **Brute Force & Rate Limiting**:
   * IAM inspects `OTPLogDao.otpcount()`. If the number of attempts within a configured time window exceeds policy, the account is temporarily blocked.
3. **Session Invalidation on Logout**:
   * On explicit logout, `main.service.ts:logout()` invalidates the token in IAM (`/detoken`), notifies the Admin backend (`/logout`), sets session status to `4` (Revoked), and purges local storage and cookies.

---

## 6. Daily Hands-on Checklist for Interns (Pillar 2)

- [ ] **Step 1: Code Trace**  
  Follow the authentication request lifecycle through [`login.component.ts`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa/projects/iam/src/app/login/login.component.ts) and [`Signin.java`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iAM_repo/ibanking_iam/src/main/java/com/function/Signin.java).
- [ ] **Step 2: Token Inspection**  
  Open Chrome/Edge DevTools (F12) > Application Tab to inspect the cookies (`atoken`) and LocalStorage (`btoken`).
- [ ] **Step 3: OTP Lifecycle**  
  Examine [`Verifyuser.java`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/iAM_repo/ibanking_iam/src/main/java/com/function/Verifyuser.java) to understand how the SMS gateway verifies OTPs and creates signed JWT claims.
- [ ] **Step 4: Silent Refresh**  
  Review [`InActiveTimerService.ts`](file:///Users/HlwanKyaw/Dev%20320/digital_banking/adminConsole_repo/admin_console_spa/projects/ibanking-admin/src/app/services/inactivetimer.service.ts) to see how mouse movement maintains the active banking session.
