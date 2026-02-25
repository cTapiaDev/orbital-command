<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/')
}
</script>

<template>
    <div
        class="h-screen w-full bg-space-black flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand)_0%,_transparent_20%)] opacity-5 pointer-events-none"
        ></div>

        <div class="text-center z-10">
            <div class="mb-8 relative inline-block">
                <font-awesome-icon
                    icon="satellite-dish"
                    class="text-8xl text-brand/50 animate-pulse"
                />
                <div
                    class="absolute top-0 right-0 w-4 h-4 bg-rose-500 rounded-full animate-ping"
                ></div>
            </div>

            <h1 class="text-6xl font-black text-white mb-4 tracking-widest">404</h1>
            <h2 class="text-2xl font-bold text-muted uppercase tracking-widest mb-6">
                Señal Perdida
            </h2>

            <p class="text-muted max-w-md mx-auto mb-10 leading-relaxed">
                Las coordenadas ingresadas no corresponden a ningún sector de la base de datos
            </p>

            <button
                @click="goHome"
                class="px-8 py-3 rounded-xl border border/30 text-brand font-bold uppercase tracking-widest hover:bg-brand/70 hover:text-white transition-all cursor-pointer"
            >
                Volver a la Base
            </button>
        </div>
    </div>
</template>
