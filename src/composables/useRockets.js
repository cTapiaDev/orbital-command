import { ref, computed } from 'vue'
import { rockets as rocketsData } from '@/data/rockets'

export const useRockets = () => {
    const rockets = ref(rocketsData)

    const getRocketById = (id) => {
        return rockets.value.find((r) => r.id === Number(id))
    }

    const activeCount = computed(() => {
        return rockets.value.filter((r) => r.active).length
    })

    const totalCost = computed(() => {
        return rockets.value.reduce((acc, r) => acc + r.cost, 0)
    })

    return {
        rockets,
        getRocketById,
        activeCount,
        totalCost,
    }
}
