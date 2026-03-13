import { io } from 'socket.io-client'

class SocketService {
    constructor() {
        this.socket = null
    }

    connect() {
        if (!this.socket) {
            this.socket = io('http://localhost:3001')

            this.socket.on('connect', () => {
                console.log('Conectado a la red de telemetría orbital.')
            })

            this.socket.on('disconnect', () => {
                console.warn('Conexión perdida con el centro de control...')
            })
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }

    subscribe(event, callback) {
        if (!this.socket) this.connect()
        this.socket.on(event, callback)
    }

    unsubscribe(event) {
        if (this.socket) {
            this.socket.off(event)
        }
    }
}

export const socketService = new SocketService()
