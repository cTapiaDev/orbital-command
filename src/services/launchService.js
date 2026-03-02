import { api } from './api'

export const launchService = {
    queryLaunches: async (searchString, statusFilter, page = 1, limit = 10) => {
        try {
            const queryParams = {}

            if (searchString) {
                queryParams.name = {
                    $regex: searchString,
                    $options: 'i',
                }
            }

            if (statusFilter === 'success') {
                queryParams.success = true
            } else if (statusFilter === 'failed') {
                queryParams.success = false
            }

            const body = {
                query: queryParams,
                options: {
                    page,
                    limit,
                    sort: { date_utc: 'desc' },
                },
            }

            const response = await api.post('/launches/query', body)
            return response.data
        } catch (error) {
            console.log('Error en queryLaunches:', error)
            throw error
        }
    },
}
