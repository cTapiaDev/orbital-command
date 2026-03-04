import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { spacexService } from '@/services/spacexServices'

export const useFleetStore = defineStore('fleet', () => {
    const rockets = ref([])
    const isLoading = ref(false)
    const isError = ref(false)
    const isFetched = ref(false)

    const activeRocketsCount = computed(() => {
        return rockets.value.filter((r) => r.active).length
    })

    const fetchRockets = async () => {
        // Patrón Singleton
        if (isFetched.value) {
            console.log('[Pinia] Cohetes los sacamos desde caché local')
            return
        }

        isLoading.value = true
        isError.value = false

        try {
            const data = await spacexService.getAllRockets()
            rockets.value = data
            isFetched.value = true
        } catch (err) {
            console.error('Error en FleetStore:', err)
            isError.value = true
        } finally {
            isLoading.value = false
        }
    }

    return {
        rockets,
        isLoading,
        isError,
        activeRocketsCount,
        fetchRockets,
    }
})
