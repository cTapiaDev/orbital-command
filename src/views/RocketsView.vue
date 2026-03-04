<script setup>
import { onMounted } from 'vue'
import { useFleetStore } from '@/stores/fleetStore'
import { storeToRefs } from 'pinia'
import RocketCard from '@/components/rockets/RocketCard.vue'
import RocketSkeleton from '@/components/ui/RocketSkeleton.vue'

const fleetStore = useFleetStore()
const { rockets, isLoading, isError } = storeToRefs(fleetStore)
const { fetchRockets } = fleetStore

onMounted(() => {
    fetchRockets()
})
</script>

<template>
    <div>
        <div class="flex items-end justify-between mb-8">
            <div>
                <h2 class="text-3xl font-bold text-white mb-2">
                    Flota <span class="text-brand">SpaceX</span>
                </h2>
                <p class="text-muted">
                    Cohetes de lanzamiento orbital y transporte interplanetario.
                </p>
            </div>
            <div class="text-right hidden md:block">
                <span class="text-2xl font-bold text-white">{{ rockets.length }}</span>
                <span class="text-xs text-muted uppercase block tracking-widest"
                    >Unidades Operativas</span
                >
            </div>
        </div>

        <div
            v-if="isError"
            class="text-center py-20 bg-space-panel rounded-2xl border border-rose-500/20"
        >
            <font-awesome-icon icon="satellite-dish" class="text-5xl text-rose-500/50 mb-4" />
            <h3 class="text-xl font-bold text-white mb-2">Error de Sincronización</h3>
            <p class="text-muted mb-6">No se pudo establecer conexión con los servidores</p>
            <button
                @click="fetchRockets"
                class="px-6 py-2 bg-rose-500/20 text-rose-400 font-bold rounded-xl border border-rose-500/20 cursor-pointer hover:bg-rose-500 hover:text-white transition-colors"
            >
                Reintentar Conexión
            </button>
        </div>

        <div v-observe class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <template v-if="isLoading">
                <RocketSkeleton v-for="n in 3" :key="n" />
            </template>

            <template v-else>
                <RocketCard
                    v-for="rocket in rockets"
                    :key="rocket.id"
                    :rocket="{
                        id: rocket.id,
                        name: rocket.name,
                        description: rocket.description,
                        height: rocket.height.meters,
                        mass: rocket.mass.kg,
                        cost: rocket.cost_per_launch,
                        active: rocket.active,
                        image: rocket.flickr_images[0],
                    }"
                />
            </template>
        </div>
    </div>
</template>
