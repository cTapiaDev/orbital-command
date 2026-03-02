<script setup>
import { ref, onMounted } from 'vue'
import { useLaunches } from '@/composables/useLaunches'
import SearchBar from '@/components/ui/SearchBar.vue'
import FilterSelect from '@/components/ui/FilterSelect.vue'
import LaunchCard from '@/components/launches/LaunchCard.vue'
import LaunchDetailModal from '@/components/launches/LaunchDetailModal.vue'

const {
    launches,
    isLoading,
    isError,
    filterStatus,
    currentPage,
    totalPages,
    totalDocs,
    hasNextPage,
    hasPrevPage,
    fetchLaunches,
    updateSearchQuery,
    nextPage,
    prevPage,
    formatDate,
} = useLaunches()

const isModalOpen = ref(false)
const selectedLaunch = ref(null)

const openLaunchDetails = (launchData) => {
    selectedLaunch.value = launchData
    isModalOpen.value = true
}

onMounted(() => {
    fetchLaunches()
})
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

        <div class="relative mb-8">
            <p class="text-sm text-muted font-bold tracking-widest uppercase mb-6">
                Base de datos: {{ totalDocs }} registros (Página {{ currentPage }} de
                {{ totalPages }})
            </p>

            <div
                v-if="isError"
                class="text-center py-16 bg-psace-panel rounded-2xl border border-rose-500/20"
            >
                <p class="text-rose-400 font-bold mb-4">Error al consultar los registros</p>
                <button @click="fetchLaunches" class="text-brand hover:underline">
                    Reintentar
                </button>
            </div>

            <div
                v-if="isLoading"
                class="absolute inset-0 top-10 z-10 flex flex-col items-center justify-center bg-space-black/80 backdrop-blur-sm rounded-2xl border border-white/5"
            >
                <font-awesome-icon
                    icon="satellite"
                    class="text-4xl text-brand animate-pulse mb-4"
                />
                <span class="text-muted tracking-widest uppercase text-xs">Sincronizando...</span>
            </div>

            <TransitionGroup
                tag="div"
                name="list"
                class="grid grid-cols-1 lg:grid-cols-2 gap-6 relative"
            >
                <div
                    v-if="launches.length === 0 && !isLoading && !isError"
                    key="empty"
                    class="lg:col-span-2 text-center py-16 bg-space-panel rounded-2xl border border-white/5 border-dashed"
                >
                    <h3 class="text-xl font-bold text-white mb-2">Sin coincidencias</h3>
                </div>

                <LaunchCard
                    v-for="launch in launches"
                    :key="launch.id"
                    :launch="launch"
                    :formattedDate="formatDate(launch.date_utc)"
                    @view-details="openLaunchDetails"
                />
            </TransitionGroup>
        </div>

        <div class="flex items-center justify-between border-t border-white/10 pt-6">
            <button
                @click="prevPage"
                :disabled="!hasPrevPage"
                class="px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors"
                :class="
                    hasPrevPage
                        ? 'bg-white/5 text-white hover:bg-brand/70 cursor-pointer'
                        : 'opacity-30 text-muted cursor-not-allowed'
                "
            >
                Anterior
            </button>

            <span class="text-muted font-mono text-sm">{{ currentPage }} / {{ totalPages }}</span>

            <button
                @click="nextPage"
                :disabled="!hasNextPage"
                class="px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors"
                :class="
                    hasNextPage
                        ? 'bg-white/5 text-white hover:bg-brand/70 cursor-pointer'
                        : 'opacity-30 text-muted cursor-not-allowed'
                "
            >
                Siguiente
            </button>
        </div>

        <LaunchDetailModal
            :is-open="isModalOpen"
            :launch="selectedLaunch"
            @close="isModalOpen = false"
        />
    </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
}
</style>
