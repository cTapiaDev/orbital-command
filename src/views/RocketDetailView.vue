<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRockets } from '@/composables/useRockets'
import AppBadge from '@/components/ui/AppBadge.vue'

const props = defineProps({
    id: { type: String, required: true },
})

const router = useRouter()
const { getRocketById } = useRockets()

const rocket = computed(() => {
    return getRocketById(props.id)
})
</script>

<template>
    <div v-if="rocket" class="animate-fade-in-up">
        <button
            @click="router.back()"
            class="flex items gap-2 items-center text-muted hover:text-white mb-6 transition-colors group cursor-pointer"
        >
            <font-awesome-icon
                icon="arrow-left"
                class="group-hover:-translate-x-1 transition-transform"
            />
            Volver a la flota
        </button>

        <header
            class="relative w-full h-100 rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-8"
        >
            <img :src="rocket.image" class="w-full h-full object-cover" />
            <div
                class="absolute inset-0 bg-linear-to-t from-space-black via-space-black/50 to-transparent"
            ></div>

            <div class="absolute bottom-0 left-0 p-10 w-full">
                <div class="flex items-center gap-4 mb-2">
                    <AppBadge :active="rocket.active" />
                    <span class="text-brand font-mono text-sm tracking-widest uppercase"
                        >CODE: {{ rocket.id }}</span
                    >
                </div>

                <h2 class="text-5xl md:text-7xl font-bold text-white mb-2">{{ rocket.name }}</h2>
                <p class="text-xl text-muted max-w-2xl">{{ rocket.description }}</p>
            </div>
        </header>

        <div class="border-b border-white/10 flex gap-8">
            <button
                class="pb-4 text-brand border-b-2 border-brand font-bold uppercase tracking-widest text-sm cursor-pointer"
            >
                Visión General
            </button>
            <button
                class="pb-4 text-muted hover:text-white font-bold uppercase tracking-widest text-sm transition-colors cursor-pointer"
            >
                Especificaciones
            </button>
            <button
                class="pb-4 text-muted hover:text-white font-bold uppercase tracking-widest text-sm transition-colors cursor-pointer"
            >
                Historial
            </button>
        </div>

        <div class="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-space-panel p-8 rounded-2xl border border-white/5">
                <h3 class="text-white font-bold mb-4 flex items-center gap-2">
                    <font-awesome-icon icon="rocket" class="text-brand" />
                    Resumen Técnico
                </h3>
                <ul class="space-y-4">
                    <li class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-muted">Altura</span>
                        <span class="text-white font-mono">{{ rocket.height }}</span>
                    </li>
                    <li class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-muted">Masa</span>
                        <span class="text-white font-mono">{{ rocket.mass.toLocaleString() }}</span>
                    </li>
                    <li class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-muted">Etapas</span>
                        <span class="text-white font-mono">2</span>
                    </li>
                </ul>
            </div>

            <div class="bg-space-panel p-8 rounded-2xl border border-white/5">
                <p class="text-muted italic">Futuro Gráfico con D3.js</p>
            </div>
        </div>
    </div>

    <div v-else class="text-center py-20">
        <h2 class="text-2xl text-white font-bold mb-2">Cohete no encontrado</h2>
        <p class="text-muted">El CODE {{ id }} no corresponde a ningún cohete existente.</p>
        <button @click="router.back()" class="mt-6 text-brand hover:underline cursor-pointer">
            Volver al catálogo
        </button>
    </div>
</template>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
