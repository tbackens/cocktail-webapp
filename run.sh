#!/bin/sh 
ip=$(ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}') 
chromium-browser --start-fullscreen &
#HOST=$ip npm start &
#npm start &
cd server
python3 api.py &
chromium-browser --start-fullscreen ${ip}:5001

