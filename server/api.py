from flask import Flask, jsonify, request, send_from_directory
import json
from flask_cors import CORS
from options import bottles_objects
from services import filter_cocktails, mix_cocktail, get_json_pumps
from flask_socketio import SocketIO
import time
from threading import Thread
import os
import sys



import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip = (s.getsockname()[0])

app = Flask(__name__)


CORS(app)


socket = SocketIO(app, cors_allowed_origins='*', async_mode='threading')

class PumpThread(Thread):
    def __init__(self,ings=[], pumps=[], values=[],gpios=[], factor=0):
        super(PumpThread, self).__init__()
        self.ings = ings
        self.pumps = pumps
        self.values = values
        self.gpios = gpios
        self.factor = factor
    def run(self):
        for ing, pump, value, gpio in zip(self.ings, self.pumps, self.values, self.gpios):
            socket.emit('receive_pump_status', (f'PUMPE {pump + 1}: {ing} -- {value}ml'))
            time.sleep(value * self.factor)




def pump(ings, pump_ids, values, gpios, factor):
    print(ings)
    for ing, pump, value, gpio in zip(ings, pump_ids, values, gpios):
        #print(f'PUMPE {pump + 1}: {ing} -- {value}ml')
        time.sleep(value * factor)



@socket.on('start_cocktail')
def start_cocktail(obj):
    print(obj)
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

    print(pump_ids)
    print(ings)
    print(gpios)
    print(values)
    pump_thread = PumpThread(ings, pump_ids, values, gpios, factor, )
    pump_thread.start()
    for i in range(101):
        socket.emit('receive_progress',i)
        time.sleep(runtime / 100)
    pump_thread.join()
    socket.emit('receive_end_signal', 'ENDE')

@socket.on('start_manual')
def start_manual(data):
    factor = 0.1
    print('start adding ' + str(data['value']) + ' ml of' + data['pump']['name'])
    time.sleep(factor * data['value'])
    print('pump stopped')
    socket.emit('pump_stopped_signal')


@app.route('/cocktails', methods=['GET'])
def get_cocktails():
    filter = filter_cocktails()
    return jsonify(filter)

@app.route('/pumps', methods=['GET'])
def get_pumps():
    data = []
    with open(os.path.join(sys.path[0] ,'pumps.json')) as pumps:
        data = json.load(pumps)
    
    return jsonify(data)

@app.route('/pumps/update', methods=['GET', 'POST'])
def update_pumps():
    req_data = request.get_data().decode()

    file = open(os.path.join(sys.path[0] ,'pumps.json'), 'w+')
    file.write(req_data)
    file.close()
    return req_data

@app.route('/options', methods=['GET'])
def get_options():
    
    return jsonify(bottles_objects)

@app.route('/<img>', methods=['GET'])
def get_image(img):
    
    return img


@app.route('/cocktails/add', methods=['POST'])
def add_cocktail():
    pass

@app.route('/cocktails/start', methods=['GET', 'POST'])
def start_mix():
    req_data = request.get_data().decode()


    return req_data



if __name__ == '__main__':
    socket.run(app, debug=True, host=ip, port=5001)