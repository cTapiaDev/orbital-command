<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
// import { useTerminal } from '@/composables/useTerminal'
import { socketService } from '@/services/socketService'

// const { logs, addLog } = useTerminal()

// const terminalContainer = ref(null)

// watch(
//     logs,
//     async () => {
//         await nextTick()

//         if (terminalContainer.value) {
//             terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight
//         }
//     },
//     { deep: true },
// )

// const simulateLog = () => {
//     addLog(`Ping de satélite recibido a las ${new Date().toLocaleTimeString()}`, 'success')
// }

const logs = ref([])
const terminalBody = ref(null)

const addRealTimeLog = (logData) => {
    const time = new Date(logData.timestamp).toLocaleTimeString('es-CL')

    logs.value.push({
        id: Date.now() + Math.random(),
        time: time,
        text: logData.message,
        type: logData.level,
    })

    if (logs.value.length > 50) {
        logs.value.shift()
    }

    scrollToBottom()
}

const scrollToBottom = async () => {
    await nextTick()
    if (terminalBody.value) {
        terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
}

onMounted(() => {
    socketService.connect()
    socketService.subscribe('telemetry_update', addRealTimeLog)

    logs.value.push({
        id: 1,
        time: new Date().toLocaleTimeString('es-CL'),
        text: 'Terminal inicializada. Esperando telemetría en vivo...',
        type: 'success',
    })
})

onUnmounted(() => {
    socketService.unsubscribe('telemetry_update')
})
</script>

<template>
    <div class="bg-black/50 border border-white/10 rounded-xl overflow-hidden flex flex-col h-80">
        <header
            class="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center"
        >
            <!-- <span class="text-xs font-mono text-muted uppercase tracking-widest"
                >Terminal del Sistema</span
            >
            <button
                @click="simulateLog"
                class="text-2xs bg-brand/20 text-brand px-2 py-1 rounded hover:bg-brand/40 cursor-pointer transition-colors"
            >
                Test Ping
            </button> -->
            <div class="flex items-center gap-2">
                <font-awesome-icon icon="terminal" class="text-muted" />
                <span class="text-white font-bold tracking-widest uppercase text-xs"
                    >Mission Logs (En Vivo)</span
                >
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-emerald-500 text-xs tracking-widest uppercase">Socket LINK</span>
            </div>
        </header>

        <div
            ref="terminalBody"
            class="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 custom-scrollbar"
        >
            <div
                v-for="log in logs"
                :key="log.id"
                class="flex gap-3 items-start animate-fade-in-up"
            >
                <span class="text-muted shrink-0">[{{ log.time }}]</span>
                <span
                    :class="{
                        'text-emerald-400': log.type === 'success',
                        'text-brand': log.type === 'info',
                        'text-yellow-400': log.type === 'warning',
                        'text-rose-500': log.type === 'error',
                    }"
                    >{{ log.text }}</span
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
