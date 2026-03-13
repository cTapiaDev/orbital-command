import axios from 'axios'
import { useToast } from '@/composables/useToast'
import { useTerminal } from '@/composables/useTerminal'
import { useAuthStore } from '@/stores/authStore'

const { addToast } = useToast()
const { addLog } = useTerminal()

export const api = axios.create({
    baseURL: import.meta.env.VITE_SPACEX_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

//Se ejecuta ANTES de que la petición salga del navegador.
// api.interceptors.request.use(
//     (config) => {
//         const token = 'Orbital-Command-Token-2026'
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         addLog(`Enviando telemetría a: ${config.url}`, 'info')
//         addToast(`Enviando telemetría a: ${config.url}`, 'info')
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     },
// )

// Se ejecuta ANTES de que el componente reciba los datos.
api.interceptors.response.use(
    (response) => {
        addLog(`[API Response] Success: ${response.config.url}`, 'success')
        addToast(`[API Response] Success: ${response.config.url}`, 'success')
        return response
    },
    (error) => {
        if (error.response) {
            const status = error.response.status
            if (status === 404) {
                addLog('Error 404: Recurso no encontrado en el servidor.', 'error')
                addToast('Error 404: Recurso no encontrado en el servidor.', 'error')
            } else if (status === 401) {
                addToast('Sesión expirada. Ingresa nuevamente', 'error')
                const authStore = useAuthStore()
                authStore.logout()
            } else if (status >= 500) {
                addLog('Error 500: Falla crítica en los servidores de SpaceX.', 'error')
                addToast('Error 500: Falla crítica en los servidores de SpaceX.', 'error')
            } else {
                addLog(`Error ${status}: Problemas en la red.`, 'error')
                addToast(`Error ${status}: Problemas en la red.`, 'error')
            }
        } else if (error.request) {
            addLog(`Error de Red: Verifica tu conexión satelital.`, 'error')
            addToast(`Error de Red: Verifica tu conexión satelital.`, 'error')
        } else {
            addLog(`Error interno del cliente HTTP.`, 'error')
            addToast(`Error interno del cliente HTTP.`, 'error')
        }

        return Promise.reject(error)
    },
)
