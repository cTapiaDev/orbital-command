import { ref, computed } from 'vue'
import { launches as launchesData } from '@/data/launches'

export const useLaunches = () => {
    const launches = ref(launchesData)

    const searchQuery = ref('')
    const filterStatus = ref('all')

    let timeoutId = null
    const updateSearchQuery = (newValue) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            searchQuery.value = newValue
        }, 300)
    }

    const filteredLaunches = computed(() => {
        return launches.value.filter((launch) => {
            // Lógica de búsqueda
            const matchesSearch = launch.name
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())

            // Lógica de filtrado
            let matchesStatus = true
            if (filterStatus.value === 'success') {
                matchesStatus = launch.success === true
            } else if (filterStatus.value === 'failed') {
                matchesStatus = launch.success === false
            }

            return matchesSearch && matchesStatus
        })
    })

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('es-CL', options)
    }

    return {
        searchQuery,
        filterStatus,
        filteredLaunches,
        updateSearchQuery,
        formatDate,
    }
}
