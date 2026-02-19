<script setup>
import StatItem from '@/components/ui/StatItem.vue'
import { formatCurrency } from '@/utils/formatters'

defineProps({
    rocket: { type: Object, required: true },
})

const calculatePayloadRatio = (mass) => `${(mass / 1000).toFixed(1)} T`
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-space-panel p-8 rounded-2xl border border-white/5">
                <h3 class="text-xl text-white font-bold mb-4">Resumen de Misión</h3>
                <p class="text-muted leading-relaxed text-lg">{{ rocket.description }}</p>
            </div>

            <div class="bg-space-panel p-8 rounded-2xl border border-white/5">
                <div class="flex justify-between items-end mb-4">
                    <h3 class="text-sm font-bold text-muted uppercase tracking-widest">
                        Tasa de Éxito Histórica
                    </h3>
                    <span class="text-3xl font-black text-emerald-400">78.5%</span>
                </div>
                <div
                    class="w-full bg-space-black rounded-full h-3 border border-white/5 overflow-hidden"
                >
                    <div class="bg-emerald-500 h-3 rounded-full" style="width: 78.5%"></div>
                </div>
            </div>
        </div>

        <div class="bg-space-panel p-8 rounded-2xl border border-white/5 flex flex-col gap-4">
            <h3
                class="text-sm font-bold text-muted uppercase tracking-widest mb-2 border-b border-white/5 pb-4"
            >
                Parámetros Clave
            </h3>

            <StatItem
                icon="money-bill-wave"
                label="Costo por Lanzamiento"
                :value="formatCurrency(rocket.cost)"
            />

            <StatItem
                icon="weight-hanging"
                label="Masa Estructural"
                :value="calculatePayloadRatio(rocket.mass)"
            />

            <StatItem
                icon="ruler-vertical"
                label="Altura Total"
                :value="`${rocket.height} Metros`"
            />
        </div>

        <div class="bg-space-panel p-8 rounded-2xl border border-white/5">
            <p class="text-muted italic">Futuro Gráfico con D3.js</p>
        </div>
    </div>
</template>
