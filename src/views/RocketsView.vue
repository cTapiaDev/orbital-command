<script setup>
import { ref, onMounted } from 'vue'
import { rockets as rocketsData } from '@/data/rockets'
import RocketCard from '@/components/rockets/RocketCard.vue'
import RocketSkeleton from '@/components/ui/RocketSkeleton.vue'

const rockets = ref([])
const isLoading = ref(true)

onMounted(() => {
    setTimeout(() => {
        rockets.value = rocketsData
        isLoading.value = false
    }, 1500)
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

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <template v-if="isLoading">
                <RocketSkeleton v-for="n in 3" :key="n" />
            </template>

            <template v-else>
                <RocketCard v-for="rocket in rockets" :key="rocket.id" :rocket="rocket" />
            </template>
        </div>
    </div>
</template>
