<script setup>
import { useRockets } from '@/composables/useRockets'
import DashboardWidget from '@/components/ui/DashboardWidget.vue'
import { formatCurrency } from '@/utils/formatters'

const { rockets, activeCount, totalCost } = useRockets()
</script>

<template>
    <div>
        <h2 class="text-3xl font-light text-white mb-2">
            Misión <strong class="font-bold text-brand">Control</strong>
        </h2>
        <p class="text-muted mb-8">Resumen operativo de la flota.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardWidget title="Unidades Totales" :value="rockets.length" icon="rocket" />
            <DashboardWidget
                title="Cohetes Activos"
                :value="activeCount"
                icon="fire"
                color="text-emerald-400"
            />
            <DashboardWidget
                title="Valor de Flota"
                :value="formatCurrency(totalCost)"
                icon="database"
                color="text-yellow-400"
            />
        </div>

        <div class="bg-space-panel border border-white/5 rounded-2xl p-8 text-center">
            <h3 class="text-xl font-bold text-white mb-4">Gestión de Lanzamientos</h3>
            <p class="text-muted mb-6 max-w-lg mx-auto">
                Accede a la configuración técnica de los cohetes y programa nuevas misiones.
            </p>
            <RouterLink
                to="/rockets"
                class="inline-flex items-center gap-2 px-6 py-3 bg-brand/60 text-white font-bold rounded-xl cursor-pointer hover:bg-brand-hover transition-colors"
            >
                Ver Flota Completa <font-awesome-icon icon="arrow-right" />
            </RouterLink>
        </div>
    </div>
</template>
