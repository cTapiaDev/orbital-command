<script setup>
import { provide, ref, onMounted, onUnmounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/composables/useToast'
import SystemClock from '@/components/ui/SystemClock.vue'
import { socketService } from '@/services/socketService'

const authStore = useAuthStore()
const { addToast } = useToast()
const appVersion = ref(import.meta.env.VITE_SYSTEM_VERSION)
const appTitle = ref(import.meta.env.VITE_APP_TITLE)

const currentUser = ref({
    name: 'Cmdr. Shepard',
    rank: 'Nivel 5',
    clearance: ['overview', 'tech', 'launches'],
    avatar: 'user-astronaut',
})

provide('userContext', currentUser)

const handleCriticalAnomaly = (data) => {
    addToast(`¡ALERTA!: ${data.message} (${data.code})`, 'error')
}

onMounted(() => {
    socketService.connect()
    socketService.subscribe('critical_anomaly', handleCriticalAnomaly)
})

onUnmounted(() => {
    socketService.unsubscribe('critical_anomaly')
    socketService.disconnect()
})
</script>

<template>
    <div class="flex h-screen w-full bg-space-black">
        <aside class="w-64 flex flex-col border-r border-white/5 bg-space-panel">
            <div class="h-20 flex items-center px-6 border-b border-white/5">
                <font-awesome-icon
                    icon="shuttle-space"
                    class="text-brand text-2xl mr-3 animate-pulse"
                />
                <div>
                    <h1 class="text-lg font-bold tracking-widest text-white uppercase">Orbital</h1>
                    <span class="text-2xs text-brand tracking-[0.3em] block uppercase"
                        >Command</span
                    >
                </div>
            </div>

            <nav class="flex-1 py-6 space-y-2 px-3">
                <RouterLink
                    to="/"
                    class="flex items-center px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-all rounded-lg group"
                    exact-active-class="bg-brand/10 text-brand border-r-4 border-brand"
                >
                    <font-awesome-icon
                        icon="chart-pie"
                        class="mr-3 w-5 group-hover:text-brand transition-colors"
                    />
                    Dashboard
                </RouterLink>

                <RouterLink
                    to="/rockets"
                    class="flex items-center px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-all rounded-lg group"
                    active-class="bg-brand/10 text-brand border-r-4 border-brand"
                >
                    <font-awesome-icon
                        icon="rocket"
                        class="mr-3 w-5 group-hover:text-brand transition-colors"
                    />
                    Flota
                </RouterLink>

                <RouterLink
                    to="/launches"
                    class="flex items-center px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-all rounded-lg group"
                    active-class="bg-brand/10 text-brand border-r-4 border-brand"
                >
                    <font-awesome-icon
                        icon="jedi"
                        class="mr-3 w-5 group-hover:text-brand transition-colors"
                    />
                    Misiones
                </RouterLink>
            </nav>

            <div class="p-6 border-t border-white/5 bg-black/20">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center border border-brand/50"
                        >
                            <font-awesome-icon
                                :icon="authStore.user?.avatar || 'user-astronaut'"
                                class="text-brand"
                            />
                        </div>
                        <div>
                            <p class="text-sm font-bold text-white">
                                {{ authStore.user?.name || 'Comandante' }}
                            </p>
                            <p class="text-2xs text-muted uppercase">
                                {{ authStore.user?.rank || 'Acceso Nivel -' }}
                            </p>
                        </div>
                    </div>
                    <button
                        @click="authStore.logout()"
                        class="text-xs text-rose-400 hover:text-rose-500 transition-colors cursor-pointer uppercase font-bold tracking-widest"
                    >
                        Salir
                    </button>
                </div>
            </div>
        </aside>

        <main class="flex-1 flex flex-col relative">
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-brand)_0%,_transparent_20%)] opacity-15 pointer-events-none"
            ></div>

            <header
                class="h-20 border-b border-white/5 flex items-center justify-between px-10 relative z-10"
            >
                <div>
                    <p class="text-2xs text-muted uppercase tracking-widest">{{ appTitle }}</p>
                    <p class="text-2xs text-brand font-mono">{{ appVersion }}</p>
                </div>
                <SystemClock />
            </header>

            <div class="flex-1 overflow-y-auto p-10">
                <RouterView />
            </div>
        </main>
    </div>
</template>
