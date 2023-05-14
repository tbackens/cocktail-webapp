#!/bin/sh 
ip=$(ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}') 
#HOST=$ip npm start &
npm start &
cd server
python3 api.py &
sleep 40
chromium-browser --start-fullscreen ${ip}:3000/qr

