# Cocktailmaker

The cocktailmaker is the perfekt "must-have" for your next party or festival!
Up to 8 ingredients can be connected to the machine.
A list of cocktails is filtered by the assigned ingredients.
Users can choose between these cocktails via a mobile device.
The selected cocktail is poured.
Users can also add single ingredients manually.


## Prerequisites

### Main Hardware

* Raspberry Pi 3b with Wifi.
* 3.5" LCD Touchscreen
* Relayboard (8x)
* 8x 12v membrane pump.
* Power supply for 12v and 5v

More information about the hardware i used can be found on my website.

### Software

* Raspberry Pi OS with Desktop enviroment.
* Python and pip
* Node.js and npm or yarn



## Installation

1. Clone this repository to your RaspberryPi  
`git clone https://github.com/tbackens/cocktail-webapp.git`

2. Open a terminal window and navigate to the project directory.

3. run nmp install.  
`npm install`

4. Create a build.  
`npm run build`

5. Navigate to the server directory  
`cd server`

6. Crate a virtual enviroment an install the dependencies  
```
python -m venv venv
pip install -r requirements.txt
```


## Startup

You can now run the machine by running `sh run.sh` inside the project's root directory,
but you should create a .desktop file to run the app from your desktop or on autostart

Navigate to your desktop directory and run `sudo nano cocktail.desktop`,  
then insert the following code:  
```
[Desktop Entry]

Type=Application
Name=cocktail
Path=/home/pi/cocktail-webapp/server
Exec=python3 /home/pi/cocktail-webapp/server/api.py
Terminal =	false
```

run `^o` and `^x` to write and close the file.

You can now start the app by clicking the desktop icon.

To run the app automaticly after startup, you can insert the cocktail.desktop file into your
`~/.config/autostart` directory.


