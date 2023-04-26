import json
import time
import threading

status = 0

def get_json_pumps():
    with open('/Users/t.backens/VS_code/projects/cocktail-webserver/server/pumps.json') as pumps:
        pumps = json.load(pumps)
        return pumps

def filter_cocktails():
    all_cocktails = []
    with open('/Users/t.backens/VS_code/projects/cocktail-webserver/server/drinks.json') as drinks:
        all_cocktails = json.load(drinks)
    pumps = []
    with open('/Users/t.backens/VS_code/projects/cocktail-webserver/server/pumps.json') as pumps:
        pumps = json.load(pumps)
    pump_names = []
    for pump in pumps:
        pump_names.append(pump['name'])


    filtered_cocktails = []
    for cocktail in all_cocktails:
        compared_ings = []
        for ingredient in cocktail['ingredients'].keys():
            if ingredient in pump_names:
                compared_ings.append(ingredient)

        if len(compared_ings) == len(cocktail['ingredients']):
            filtered_cocktails.append(cocktail)
    filtered_cocktails.sort(key=lambda x: x['name'])

    return filtered_cocktails



def mix_cocktail():
    print('start')
    time.sleep(3)
    print('stop')



class PumpThread(threading.Thread):
    def __init__(self, data):
        super(PumpThread, self).__init__()
        self.data = data



    def run(self):
        try:
            pump_list = get_pumps()
            factor = 0.1
            pump_ids = []
            ings = []
            gpio = []
            values = []
            runtime = 0
                
            for pump in pump_list:
                if pump['name'] in self.data['ingredients'].keys():
                    pump_ids.append(pump['id'])
                    gpio.append(pump['gpio'])
                    values.append(self.data['ingredients'][pump['name']])
                    ings.append(pump['name'])

            for value in values:
                runtime += (value * factor)

            print(pump_ids)
            print(ings)
            print(gpio)
            print(values)

            for ing, pump, value, gpio in zip(ings, pump_ids, values, gpio):
                print(f'PUMPE {pump + 1}: {ing} -- {value}ml')
                time.sleep(value * factor)


        except AttributeError:
            print("no selection!")
