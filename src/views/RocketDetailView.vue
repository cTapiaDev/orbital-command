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

        <nav class="border-b border-white/10 flex gap-8 text-muted">
            <RouterLink
                :to="{ name: 'rocket-detail', params: { id: rocket.id } }"
                exact-active-class="text-brand border-brand"
                class="pb-4 px-2 border-b-2 font-bold uppercase tracking-widest text-sm transition-colors cursor-pointer"
            >
                <font-awesome-icon icon="rocket" class="mr-2" />
                Visión General
            </RouterLink>
            <RouterLink
                :to="{ name: 'rocket-tech', params: { id: rocket.id } }"
                exact-active-class="text-brand border-brand"
                class="pb-4 px-2 border-b-2 font-bold uppercase tracking-widest text-sm transition-colors cursor-pointer"
            >
                <font-awesome-icon icon="gear" class="mr-2" />
                Especificaciones
            </RouterLink>
            <!-- <RouterLink
                class="pb-4 text-muted hover:text-white font-bold uppercase tracking-widest text-sm transition-colors cursor-pointer"
            >
                Historial
            </RouterLink> -->
        </nav>

        <div class="py-8 relative">
            <RouterView v-slot="{ Component }">
                <!-- <transition name="fade-slide" mode="out-in"> -->
                <component :is="Component" :rocket="rocket" />
                <!-- </transition> -->
            </RouterView>
        </div>
    </div>

    <div v-else class="text-center py-20">
        <h2 class="text-2xl text-white font-bold mb-2">Cohete no encontrado</h2>
        <p class="text-muted">
            El CODE <span class="text-brand">{{ id }}</span> no corresponde a ningún cohete
            existente.
        </p>
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

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(-15px);
}

.fade-slide-leave-active {
    opacity: 0;
    transform: translateX(15px);
}
</style>
