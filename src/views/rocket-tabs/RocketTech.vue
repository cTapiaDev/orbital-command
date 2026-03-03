<script setup>
import TechChart from '@/components/charts/TechChart.vue'

defineProps({
    rocket: { type: Object, required: true },
})
</script>

<template>
    <div class="bg-space-panel p-8 rounded-2xl border border-white/5">
        <div class="flex items-center gap-4 mb-8">
            <div class="p-3 bg-brand/10 rounded-lg">
                <font-awesome-icon icon="microchip" class="text-brand text-xl" />
            </div>
            <div>
                <h3 class="text-2xl font-bold text-white">Especificaciones Técnicas</h3>
                <p class="text-muted text-sm">
                    Desglose de la arquitectura en {{ rocket.stages }} etapas.
                </p>
            </div>
        </div>

        <div>
            <TechChart :rocket="rocket" />
        </div>
    </div>
</template>
