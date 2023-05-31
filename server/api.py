from flask import Flask, jsonify, request
import json
from flask_cors import CORS
from options import bottles_objects
from services import filter_cocktails, get_json_pumps, getIP
from flask_socketio import SocketIO
import time
from threading import Thread
import os
import sys
import socket
import vlc
# - Handler in case of not installed GPIO modulev --------------

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip = (s.getsockname()[0])

class Output():
    def setup(self, *args):
        pass
    def output(self, gpio, status):
        print(f'GPIO {gpio} {status}')
    def OUT(self):
        pass
    def cleanup(self):
        pass

GPIO = Output()

# - Try statement to check if GPIO module is installed ---------


"""import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(True)
pps = get_json_pumps()
for pump in pps:
    GPIO.setup(pump['gpio'], GPIO.OUT)"""

try: 
    import RPi.GPIO as gp
    GPIO = gp
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(True)
    pps = get_json_pumps()
    for pump in pps:
        GPIO.setup(pump['gpio'], GPIO.OUT)
except:
    print('Not able to load GPIO module')


# - Initialisation ---------------------------------------------

app = Flask(__name__, static_folder='../build', static_url_path='/')

CORS(app)

socket = SocketIO(app, cors_allowed_origins='*', async_mode='threading')

# - Threads ----------------------------------------------------


            

class PumpThread(Thread):
    def __init__(self,ings=[], pumps=[], values=[],gpios=[], factor=0):
        super(PumpThread, self).__init__()
        self.ings = ings
        self.pumps = pumps
        self.values = values
        self.gpios = gpios
        self.factor = factor
    def run(self):
        try:
            for ing, pump, value, gpio in zip(self.ings, self.pumps, self.values, self.gpios):
                GPIO.output(gpio, True)
                socket.emit('receive_pump_status', (f'PUMPE {pump + 1}: {ing} -- {value}ml'))
                time.sleep(value * self.factor)
                GPIO.output(gpio, False)
            print('playing')
            sound = vlc.MediaPlayer('done.mp3')
            sound.play()
            time.sleep(3)
            sound.stop()
        except:
            print('Something went wrong')


# - Initialisation of React App --------------------------------‚

@app.route('/', methods=['GET', 'POST'])
def index():
    return app.send_static_file('index.html')


# - Websockets -------------------------------------------------

@socket.on('start_cocktail')
def start_cocktail(obj):
    data = obj    
    pump_list = get_json_pumps()
    factor = 0.04
    pump_ids = []
    ings = []
    gpios = []
    values = []
    runtime = 0
                
    for pump in pump_list:
        if pump['name'] in data['ingredients'].keys():
            pump_ids.append(pump['id'])
            gpios.append(pump['gpio'])
            values.append(data['ingredients'][pump['name']])
            ings.append(pump['name'])

    for value in values:
        runtime += (value * factor)

    pump_thread = PumpThread(ings, pump_ids, values, gpios, factor, )
    pump_thread.start()
    for i in range(101):
        socket.emit('receive_progress',i)
        time.sleep(runtime / 100)
    pump_thread.join()

    socket.emit('receive_end_signal', 'ENDE')


@socket.on('start_manual')
def start_manual(data):
    try:
        factor = 0.04
        print('start adding ' + str(data['value']) + ' ml of' + data['pump']['name'])
        print(data['pump']['gpio'])
        GPIO.output(data['pump']['gpio'], True)
        time.sleep(factor * data['value'])
        GPIO.output(data['pump']['gpio'], False)
        print('pump stopped')
        socket.emit('pump_stopped_signal')
    except:
        print('Something went wrong')



# - API Routes -------------------------------------------------

#Get the filtered list of available Cocktails
@app.route('/cocktails', methods=['GET'])
def get_cocktails():
    filter = filter_cocktails()
    return jsonify(filter)

#Get the list of selected pumps
@app.route('/pumps', methods=['GET'])
def get_pumps():
    data = []
    with open(os.path.join(sys.path[0] ,'pumps.json')) as pumps:
        data = json.load(pumps)
    return jsonify(data)

#Change the selection of pumps
@app.route('/pumps/update', methods=['GET', 'POST'])
def update_pumps():
    req_data = request.get_data().decode()

    file = open(os.path.join(sys.path[0] ,'pumps.json'), 'w+')
    file.write(req_data)
    file.close()
    return req_data

#Get the list of liquid options
@app.route('/options', methods=['GET'])
def get_options():
    
    return jsonify(bottles_objects)


@app.route('/cocktails/start', methods=['GET', 'POST'])
def start_mix():
    req_data = request.get_data().decode()
    return req_data


if __name__ == '__main__':
    socket.run(app, debug=True, host=ip, port=5001, allow_unsafe_werkzeug=True)