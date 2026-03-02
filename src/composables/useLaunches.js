import { ref, watch } from 'vue'
// import { launches as launchesData } from '@/data/launches'
import { launchService } from '@/services/launchService'
import { useToast } from './useToast'

export const useLaunches = () => {
    const { addToast } = useToast()

    // Estados reactivos
    const launches = ref([])
    const isLoading = ref(true)
    const isError = ref(false)

    // Filtros
    const searchQuery = ref('')
    const filterStatus = ref('all')

    // Paginación
    const currentPage = ref(1)
    const totalPages = ref(1)
    const hasNextPage = ref(false)
    const hasPrevPage = ref(false)
    const totalDocs = ref(0)

    const fetchLaunches = async () => {
        isLoading.value = true
        isError.value = false

        try {
            const data = await launchService.queryLaunches(
                searchQuery.value,
                filterStatus.value,
                currentPage.value,
                10,
            )

            launches.value = data.docs
            totalPages.value = data.totalPages
            hasNextPage.value = data.hasNextPage
            hasPrevPage.value = data.hasPrevPage
            totalDocs.value = data.totalDocs

            addToast('Petición POST exitosa', 'success')
        } catch (error) {
            isError.value = true
            addToast('Error en la petición POST', 'info')
        } finally {
            isLoading.value = false
        }
    }

    // Debounce
    let timeoutId = null
    const updateSearchQuery = (newValue) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            searchQuery.value = newValue
            currentPage.value = 1
            fetchLaunches()
        }, 500)
    }

    watch(filterStatus, () => {
        currentPage.value = 1
        fetchLaunches()
    })

    const nextPage = () => {
        if (hasNextPage.value) {
            currentPage.value++
            fetchLaunches()
        }
    }

    const prevPage = () => {
        if (hasPrevPage.value) {
            currentPage.value--
            fetchLaunches()
        }
    }

    // const filteredLaunches = computed(() => {
    //     return launches.value.filter((launch) => {
    //         // Lógica de búsqueda
    //         const matchesSearch = launch.name
    //             .toLowerCase()
    //             .includes(searchQuery.value.toLowerCase())

    //         // Lógica de filtrado
    //         let matchesStatus = true
    //         if (filterStatus.value === 'success') {
    //             matchesStatus = launch.success === true
    //         } else if (filterStatus.value === 'failed') {
    //             matchesStatus = launch.success === false
    //         }

    //         return matchesSearch && matchesStatus
    //     })
    // })

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('es-CL', options)
    }

    return {
        launches,
        isLoading,
        isError,
        searchQuery,
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
    }
}
