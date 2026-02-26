import { ref, watchEffect } from 'vue'

const logs = ref([{ id: 1, text: 'Inicializando sistemas de telemetría...', type: 'info' }])

export const useTerminal = () => {
    const addLog = (text, type = 'info') => {
        logs.value.push({
            id: Date.now(),
            text,
            type,
        })
    }

    watchEffect(() => {
        if (logs.value.length > 50) {
            logs.value.shift()
        }
    })

    return {
        logs,
        addLog,
    }
}
