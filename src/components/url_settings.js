import { io } from 'socket.io-client'

export const baseURL = 'http://192.168.8.118:5001'

export const socket = io(baseURL, {autoConnect: false})

export const pumpsURL = baseURL + '/pumps'
export const cocktailsURL = baseURL + '/cocktails'
export const optionsURL = baseURL + '/options'
export const updateURL = baseURL + '/pumps/update'