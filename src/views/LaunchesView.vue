<script setup>
import { ref } from 'vue'
import { useLaunches } from '@/composables/useLaunches'
import SearchBar from '@/components/ui/SearchBar.vue'
import FilterSelect from '@/components/ui/FilterSelect.vue'
import LaunchCard from '@/components/launches/LaunchCard.vue'
import LaunchDetailModal from '@/components/launches/LaunchDetailModal.vue'

const { filterStatus, filteredLaunches, updateSearchQuery, formatDate } = useLaunches()

const isModalOpen = ref(false)
const selectedLaunch = ref(null)

const openLaunchDetails = (launchData) => {
    selectedLaunch.value = launchData
    isModalOpen.value = true
}
</script>

<template>
    <div class="relative">
        <header class="mb-8">
            <h2 class="text-3xl font-bold text-white mb-2">
                Registro de <span class="text-brand">Misiones</span>
            </h2>
            <p class="text-muted">Historial completo de lanzamientos espaciales</p>
        </header>

        <div
            class="bg-space-panel border border-white/5 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
            <SearchBar @updateSearch="updateSearchQuery" />

            <FilterSelect v-model="filterStatus" />
        </div>

        <div class="space-y-4">
            <p class="text-sm text-muted font-bold tracking-widest uppercase mb-4">
                Mostrando {{ filteredLaunches.length }} resultados
            </p>

            <div
                v-if="filteredLaunches.length === 0"
                class="text-center py-16 bg-space-panel rounded-2xl border border-white/5 border-dashed"
            >
                <font-awesome-icon icon="magnifying-glass" class="text-4xl text-muted/50 mb-4" />
                <h3 class="text-xl font-bold text-white mb-2">Misión no encontrada</h3>
                <p class="text-muted">Intenta ajustar los filtros o el término de búsqueda</p>
            </div>

            <LaunchCard
                v-for="launch in filteredLaunches"
                :key="launch.id"
                :launch="launch"
                :formattedDate="formatDate(launch.date_utc)"
                @view-details="openLaunchDetails"
            />
        </div>

        <LaunchDetailModal
            :is-open="isModalOpen"
            :launch="selectedLaunch"
            @close="isModalOpen = false"
        />
    </div>
</template>
