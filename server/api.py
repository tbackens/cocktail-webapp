from flask import Flask, Response, jsonify, request
import json
from flask_cors import CORS
from options import bottles_objects
from services import filter_cocktails, mix_cocktail, get_json_pumps
from flask_socketio import SocketIO
import time
from threading import Thread

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


@app.route('/cocktails', methods=['GET'])
def get_cocktails():
    filter = filter_cocktails()
    return jsonify(filter)

@app.route('/pumps', methods=['GET'])
def get_pumps():
    data = []
    with open('/Users/t.backens/VS_code/projects/cocktail-webserver/server/pumps.json') as pumps:
        data = json.load(pumps)
    
    return jsonify(data)

@app.route('/pumps/update', methods=['GET', 'POST'])
def update_pumps():
    req_data = request.get_data().decode()

    file = open('/Users/t.backens/VS_code/projects/cocktail-webserver/server/pumps.json', 'w+')
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
    socket.run(app, debug=True, host="0.0.0.0", port=5001)