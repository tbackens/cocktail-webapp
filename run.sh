#!/bin/sh 
npm start &
cd server
python3 api.py
