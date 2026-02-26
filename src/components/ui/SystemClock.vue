<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTerminal } from '@/composables/useTerminal'

const { addLog } = useTerminal()
const currentTime = ref('')
let timeInterval = null

const updateClock = () => {
    const now = new Date()
    currentTime.value =
        now.toLocaleTimeString('en-US', {
            timeZone: 'UTC',
            hour12: false,
        }) + ' ZULU'
}

onMounted(() => {
    updateClock()
    timeInterval = setInterval(updateClock, 1000)
    addLog('SystemClock Montado: Intervalo iniciado', 'info')
})

onUnmounted(() => {
    clearInterval(timeInterval)
    addLog('SystemClock Destruido: Limpiamos el intervalo', 'info')
})
</script>

<template>
    <div class="flex items-center gap-3 px-4 py-2 bg-space-panel border border-white/10 rounded-lg">
        <font-awesome-icon icon="satellite" class="text-brand animate-pulse" />
        <span class="font-mono text-sm text-brand font-bold tracking-widest">
            {{ currentTime }}
        </span>
    </div>
</template>
