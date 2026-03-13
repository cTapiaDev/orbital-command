<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const email = ref('admin@orbital.com')
const password = ref('123456')

const handleLogin = async () => {
    if (!email.value || !password.value) return

    await authStore.login(email.value, password.value)
}
</script>

<template>
    <main
        class="h-screen w-full bg-space-black flex items-center justify-center p-6 relative overflow-hidden"
    >
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-brand)_0%,_transparent_20%)] opacity-15 pointer-events-none"
        ></div>

        <div
            class="w-full max-w-md bg-space-panel border border-white/5 rounded-2xl p-8 z-10 shadow-lg relative"
        >
            <div class="text-center mb-8">
                <font-awesome-icon icon="satellite" class="text-5xl text-brand mb-4" />
                <h1 class="text-3xl font-bold text-white uppercase tracking-widest mb-2">
                    Orbital Command
                </h1>
                <p class="text-muted text-sm">Autenticación de Nivel 5 Requerida</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
                <div>
                    <label class="block text-xs uppercase tracking-widest text-muted mb-2"
                        >Credencial / Email</label
                    >
                    <input
                        v-model="email"
                        type="email"
                        required
                        class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand transition-colors"
                    />
                </div>

                <div>
                    <label class="block text-xs uppercase tracking-widest text-muted mb-2"
                        >Código de Acceso</label
                    >
                    <input
                        v-model="password"
                        type="password"
                        required
                        class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand transition-colors"
                    />
                </div>

                <button
                    type="submit"
                    :disabled="authStore.isLoading"
                    class="w-full py-3 rounded-xl text-white bg-brand/70 font-bold tracking-widest uppercase hover:bg-brand-hover transition-colors disabled:opacity-50 flex justify-center items-center cursor-pointer"
                >
                    <font-awesome-icon
                        v-if="authStore.isLoading"
                        icon="satellite"
                        class="animate-spin mr-2"
                    />
                    {{ authStore.isLoading ? 'Verificando...' : 'Establecer Enlace' }}
                </button>
            </form>
        </div>
    </main>
</template>
