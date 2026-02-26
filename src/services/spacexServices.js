import { api } from './api'
import { useTerminal } from '@/composables/useTerminal'

const { addLog } = useTerminal()

export const spacexService = {
    getAllRockets: async () => {
        try {
            const response = await api.get('/rockets')
            return response.data
        } catch (error) {
            addLog('Error en getAllRockets', 'info')
            throw error
        }
    },

    getRocketById: async (id) => {
        try {
            const response = await api.get(`/rockets/${id}`)
            return response.data
        } catch (error) {
            addLog(`Error en getRocketsById (${id})`, 'info')
            throw error
        }
    },
}
