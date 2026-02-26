<script setup>
import { ref, watch, nextTick } from 'vue'
import { useTerminal } from '@/composables/useTerminal'

const { logs, addLog } = useTerminal()

const terminalContainer = ref(null)

watch(
    logs,
    async () => {
        await nextTick()

        if (terminalContainer.value) {
            terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight
        }
    },
    { deep: true },
)

const simulateLog = () => {
    addLog(`Ping de satélite recibido a las ${new Date().toLocaleTimeString()}`, 'success')
}
</script>

<template>
    <div class="bg-black/50 border border-white/10 rounded-xl overflow-hidden flex flex-col h-80">
        <header
            class="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center"
        >
            <span class="text-xs font-mono text-muted uppercase tracking-widest"
                >Terminal del Sistema</span
            >
            <button
                @click="simulateLog"
                class="text-2xs bg-brand/20 text-brand px-2 py-1 rounded hover:bg-brand/40 cursor-pointer transition-colors"
            >
                Test Ping
            </button>
        </header>

        <div
            ref="terminalContainer"
            class="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 custom-scrollbar"
        >
            <div v-for="log in logs" :key="log.id" class="flex gap-3">
                <span class="text-muted">[{{ new Date(log.id).toLocaleTimeString() }}]</span>
                <span :class="log.type === 'info' ? 'text-white' : 'text-emerald-400'">{{
                    log.text
                }}</span>
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
</style>
