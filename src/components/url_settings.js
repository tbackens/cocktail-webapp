import { io } from 'socket.io-client'

//const getip = require('local-ip-address')

//const ip = getip()

const host = window.location.host
const ip = host.slice(0, -5); 
console.log(ip)


//const os = require('os');
//const networkInterfaces = os.networkInterfaces();
//const ip = networkInterfaces['eth0'][0]['address']


export const baseURL = 'http://' + ip + ':5001'
console.log(baseURL)

export const socket = io(baseURL, {autoConnect: false})

export const pumpsURL = baseURL + '/pumps'
export const cocktailsURL = baseURL + '/cocktails'
export const optionsURL = baseURL + '/options'
export const updateURL = baseURL + '/pumps/update'


// 192.168.8.122:5001