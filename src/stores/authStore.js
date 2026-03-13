import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
import { useToast } from '@/composables/useToast'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const { addToast } = useToast()
        const router = useRouter()

        const token = ref(null)
        const user = ref(null)
        const isLoading = ref(false)

        const isAuthenticated = computed(() => !!token.value)

        const login = async (email, password) => {
            isLoading.value = true
            try {
                const response = await authService.login(email, password)

                token.value = response.token
                user.value = response.user

                addToast(`Bienvenido a bordo, ${user.value.name}`, 'success')

                router.push('/')
            } catch (error) {
                addToast('Acceso Denegado', 'error')
                throw error
            } finally {
                isLoading.value = false
            }
        }

        const logout = () => {
            token.value = null
            user.value = null
            addToast('Sesión cerrada correctamente', 'info')
            router.push('/login')
        }

        return {
            token,
            user,
            isLoading,
            isAuthenticated,
            login,
            logout,
        }
    },
    {
        persist: true,
    },
)
