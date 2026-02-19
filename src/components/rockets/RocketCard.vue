<script setup>
import AppBadge from '../ui/AppBadge.vue'
import StatItem from '../ui/StatItem.vue'
import { formatCurrency, formatNumber } from '@/utils/formatters'

defineProps({
    rocket: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <article
        class="group relative bg-space-panel border border-white/5 rounded-2xl overflow-hidden hover:border-brand/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-custom"
    >
        <div class="h-48 overflow-hidden relative">
            <img :src="rocket.image" :alt="rocket.name" class="w-full h-full object-cover" />
            <div class="absolute top-4 right-4 z-20">
                <AppBadge :active="rocket.active" />
            </div>
        </div>

        <div class="p-6 relative z-20 -mt-20">
            <h2 class="text-2xl font-bold text-white mb-1">{{ rocket.name }}</h2>
            <p class="text-xs text-muted mb-6 min-h-10 line-clamp-2">{{ rocket.description }}</p>

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

            <RouterLink
                :to="{ name: 'rocket-detail', params: { id: rocket.id } }"
                class="block w-full py-3 rounded-xl bg-brand/10 text-brand font-bold text-sm cursor-pointer border border-brand/20 hover:bg-brand/60 hover:text-white transition-all uppercase tracking-widest text-center"
            >
                Ver Detalles Técnicos
            </RouterLink>
        </div>
    </article>
</template>
