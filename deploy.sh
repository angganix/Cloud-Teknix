#/usr/bin/sh

cd ~/node-app/cloud-teknix
git pull
pm2 stop cloud-teknix
npm install
pm2 start --env production
pm2 save
