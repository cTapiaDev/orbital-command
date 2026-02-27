<script setup>
import { ref, inject, onMounted, onUnmounted, computed } from 'vue'
// import { useRockets } from '@/composables/useRockets'
import { spacexService } from '@/services/spacexServices'
import { useTerminal } from '@/composables/useTerminal'
import { formatCurrency } from '@/utils/formatters'
import DashboardWidget from '@/components/ui/DashboardWidget.vue'
import MissionTerminal from '@/components/ui/MissionTerminal.vue'
import WidgetSkeleton from '@/components/ui/WidgetSkeleton.vue'

// const { rockets, activeCount, totalCost } = useRockets()
const { addLog } = useTerminal()
const user = inject('userContext')
const isLoading = ref(true)
const isError = ref(false)
const rocketsData = ref([])
const companyData = ref(null)

const activeCount = computed(() => rocketsData.value.filter((r) => r.active).length)
const totalValuation = computed(() => companyData.value?.valuation || 0)

const fetchDashboardData = async () => {
    isLoading.value = true
    isError.value = false

    try {
        const [rocketsReponse, companyResponse] = await Promise.all([
            spacexService.getAllRockets(),
            spacexService.getCompanyInfo(),
        ])

        rocketsData.value = rocketsReponse
        companyData.value = companyResponse
    } catch (error) {
        isError.value = true
        addLog(`Falla crítica: ${error}`, 'error')
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    addLog(`Usuario ${user.value.name} ha accedido al Panel Principal.`, 'info')
    fetchDashboardData()
})

onUnmounted(() => {
    addLog('Destrucción del Panel Principal.', 'info')
})
</script>

<template>
    <div>
        <div
            class="mb-8 p-6 bg-brand/10 border border-brand/20 rounded-2xl flex items-center gap-4"
        >
            <font-awesome-icon :icon="user.avatar" class="text-3xl text-brand" />
            <div>
                <h2 class="text-xl font-bold text-white">Bienvenido a bordo, {{ user.name }}</h2>
                <p class="text-brand text-sm tracking-widest uppercase">
                    Autorización: {{ user.rank }}
                </p>
            </div>
        </div>

        <h2 class="text-3xl font-light text-white mb-2">
            Misión <strong class="font-bold text-brand">Control</strong>
        </h2>
        <p class="text-muted mb-8">Resumen operativo de la flota.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <template v-if="isLoading">
                <WidgetSkeleton v-for="n in 3" :key="n" />
            </template>

            <template v-else-if="isError">
                <div
                    class="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl text-center flex flex-col items-center justify-center"
                >
                    <p class="text-rose-400 font-bold mb-4">La red de telemetría está caída</p>
                    <button
                        @click="fetchDashboardData"
                        class="px-4 py-2 bg-rose-500/20 text-rose-300 rounded hover:bg-rose-500 hover:text-white transition-colors text-sm"
                    >
                        Reintar Conexión
                    </button>
                </div>
            </template>

            <template v-else>
                <DashboardWidget
                    title="Unidades Totales"
                    :value="rocketsData.length"
                    icon="rocket"
                />
                <DashboardWidget
                    title="Cohetes Activos"
                    :value="activeCount"
                    icon="fire"
                    color="text-emerald-400"
                />
                <DashboardWidget
                    title="Valor de Flota"
                    :value="formatCurrency(totalValuation)"
                    icon="database"
                    color="text-yellow-400"
                />
            </template>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="mb-8">
                <MissionTerminal />
            </div>

            <div class="bg-space-panel border border-white/5 rounded-2xl p-8 text-center">
                <template v-if="!isLoading && !isError && companyData">
                    <h3 class="text-xl font-bold text-white mb-2">{{ companyData.name }}</h3>
                    <p class="text-muted mb-4 text-sm leading-relaxed">
                        {{ companyData.summary }}
                    </p>
                    <div class="flex gap-4 text-xs font-mono text-brand">
                        <span>CEO: {{ companyData.ceo }}</span>
                        <span>|</span>
                        <span>Empleados: {{ companyData.employees.toLocaleString() }}</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
