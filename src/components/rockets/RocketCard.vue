<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { formatCurrency, formatNumber } from '@/utils/formatters'
import AppBadge from '../ui/AppBadge.vue'
import StatItem from '../ui/StatItem.vue'

defineProps({
    rocket: {
        type: Object,
        required: true,
    },
})

const router = useRouter()
const userStore = useUserStore()

const goToDetails = (id) => {
    router.push(`/rockets/${id}`)
}
</script>

<template>
    <article
        v-observe
        class="group relative bg-space-panel border border-white/5 rounded-2xl overflow-hidden hover:border-brand/50 transition-all duration-300"
    >
        <div
            class="w-full overflow-hidden relative aspect-video cursor-pointer"
            @click="goToDetails(rocket.id)"
        >
            <img
                :src="rocket.image"
                :alt="rocket.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
            />
            <div class="absolute top-4 left-4 z-20">
                <AppBadge :active="rocket.active" />
            </div>

            <button
                @click.stop="userStore.toggleFavorite(rocket.id)"
                class="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
            >
                <font-awesome-icon
                    icon="star"
                    class="text-lg transition-colors duration-300"
                    :class="userStore.isFavorite(rocket.id) ? 'text-yellow-400' : 'text-white/30'"
                />
            </button>
        </div>

        <div class="p-6">
            <h2 class="text-2xl font-bold text-white mb-1">{{ rocket.name }}</h2>
            <p class="text-xs text-muted mb-6 h-15 line-clamp-2">
                {{ rocket.description }}
            </p>

            <div class="grid grid-cols-3 gap-2 mb-6">
                <StatItem icon="ruler-vertical" label="Altura" :value="`${rocket.height}m`" />

                <StatItem
                    icon="weight-hanging"
                    label="Masa"
                    :value="`${formatNumber(rocket.mass / 1000)}`"
                />

                <StatItem
                    icon="money-bill-wave"
                    label="Costo"
                    :value="`${formatCurrency(rocket.cost)}`"
                />
            </div>

            <!-- <RouterLink
                :to="{ name: 'rocket-detail', params: { id: rocket.id } }"
                class="block w-full py-3 rounded-xl bg-brand/10 text-brand font-bold text-sm cursor-pointer border border-brand/20 hover:bg-brand/60 hover:text-white transition-all uppercase tracking-widest text-center"
            >
                Ver Detalles Técnicos
            </RouterLink> -->
        </div>
    </article>
</template>
