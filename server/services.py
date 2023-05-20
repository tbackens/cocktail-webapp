import json
import sys
import os
import socket


def get_json_pumps():
    with open(os.path.join(sys.path[0] ,'pumps.json')) as pumps:
        pumps = json.load(pumps)
        return pumps

def filter_cocktails():
    all_cocktails = []
    with open(os.path.join(sys.path[0] ,'drinks.json')) as drinks:
        all_cocktails = json.load(drinks)
    pumps = []
    with open(os.path.join(sys.path[0] ,'pumps.json')) as pumps:
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

def getIP():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip = (s.getsockname()[0])
    return ip



