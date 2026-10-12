#!/usr/bin/env bash
set -e

echo "🚀 [1/4] Pulling latest code from GitHub..."
git pull origin main

echo "📦 [2/4] Installing dependencies..."
npm install

echo "🔨 [3/4] Building production static bundle..."
npm run build

echo "⚡ [4/4] Starting / Reloading with PM2..."
mkdir -p logs

# Ensure PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "⚠️  PM2 is not installed globally. Installing pm2..."
    sudo npm install -g pm2
fi

# Reload or start process
if pm2 list | grep -q "internship-portal"; then
    pm2 reload ecosystem.config.cjs
    echo "🔄 Existing PM2 process reloaded."
else
    pm2 start ecosystem.config.cjs
    echo "✅ PM2 process started."
fi

pm2 save

echo ""
echo "🎉 Deployment Complete!"
echo "📍 Access your portal at: http://<YOUR_VM_IP>:4321"
echo "📊 Check logs with: pm2 logs internship-portal"
echo "📈 Monitor status with: pm2 status"
