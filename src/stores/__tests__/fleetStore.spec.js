import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useFleetStore } from '../fleetStore'
import { spacexService } from '@/services/spacexServices'

vi.mock('@/services/spacexServices', () => ({
    spacexService: {
        getAllRockets: vi.fn(),
    },
}))

const mockRocketsData = [
    { id: 1, name: 'Falcon 1', active: false, cost_per_launch: 6700000 },
    { id: 2, name: 'Falcon 9', active: true, cost_per_launch: 500000000 },
]

describe('Fleet Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('inicializa con un arreglo de cohetes vacío y estados de carga en false', () => {
        const store = useFleetStore()

        expect(store.rockets).toEqual([])
        expect(store.isLoading).toBe(false)
        expect(store.isError).toBe(false)
        expect(store.activeRocketsCount).toBe(0)
    })

    it('actualiza el estado rockets y los getters cuando la petición es exitosa', async () => {
        const store = useFleetStore()

        spacexService.getAllRockets.mockResolvedValue(mockRocketsData)

        await store.fetchRockets()

        expect(spacexService.getAllRockets).toHaveBeenCalledTimes(1)
        expect(store.rockets).toEqual(mockRocketsData)
        expect(store.isLoading).toBe(false)
        expect(store.isError).toBe(false)
        expect(store.activeRocketsCount).toBe(1)
    })

    it('cambia el estado isError a true si la petición falla', async () => {
        const store = useFleetStore()

        spacexService.getAllRockets.mockRejectedValue(new Error('Network Error'))

        await store.fetchRockets()

        expect(spacexService.getAllRockets).toHaveBeenCalledTimes(1)
        expect(store.rockets).toEqual([])
        expect(store.isError).toBe(true)
        expect(store.isLoading).toBe(false)
    })
})
