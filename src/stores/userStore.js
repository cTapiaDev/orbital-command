import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from '@/composables/useToast'

export const useUserStore = defineStore(
    'user',
    () => {
        const { addToast } = useToast()

        const favoriteRockets = ref([])

        const favoritesCount = computed(() => favoriteRockets.value.length)

        const isFavorite = computed(() => {
            return (rocketId) => favoriteRockets.value.includes(rocketId)
        })

        const toggleFavorite = (rocketId) => {
            const index = favoriteRockets.value.indexOf(rocketId)

            if (index === -1) {
                favoriteRockets.value.push(rocketId)
                addToast('Añadido a favoritos', 'success')
            } else {
                favoriteRockets.value.splice(index, 1)
                addToast('Eliminando de favoritos', 'info')
            }
        }

        return {
            favoriteRockets,
            favoritesCount,
            isFavorite,
            toggleFavorite,
        }
    },
    {
        persist: true,
    },
)
