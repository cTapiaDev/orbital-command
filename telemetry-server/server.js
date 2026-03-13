import { Server } from 'socket.io'

const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: ['GET', 'POST'],
    },
})

const logs = [
    { msg: 'Ajustando giroscopio del Falcon 9...', type: 'info' },
    { msg: 'Temperatura principal estable.', type: 'success' },
    { msg: 'Fluctuación de presión en tanque de oxígeno.', type: 'warning' },
    { msg: 'Sincronizando satélites Starlink en órbita baja.', type: 'info' },
]

io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`)

    const interval = setInterval(
        () => {
            const randomLog = logs[Math.floor(Math.random() * logs.length)]

            socket.emit('telemetry_update', {
                timestamp: new Date().toISOString(),
                message: randomLog.msg,
                level: randomLog.type,
            })

            if (Math.random() > 0.5) {
                socket.emit('critical_anomaly', {
                    message: '¡PÉRDIDA DE SEÑAL EN LA ETAPA 1!',
                    code: 'ERR_STAGE_1_LOST',
                })
            }
        },
        Math.random() * 4000 + 3000,
    )

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`)
        clearInterval(interval)
    })
})

console.log('Servidor corriendo en ws://localhost:3001')
