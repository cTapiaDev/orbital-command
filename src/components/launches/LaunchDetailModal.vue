<script setup>
import BaseModal from '../ui/BaseModal.vue'
import AppBadge from '../ui/AppBadge.vue'
import { useToast } from '@/composables/useToast'

const { addToast } = useToast()

defineProps({
    isOpen: { type: Boolean, required: true },
    launch: { type: Object, default: null },
})

defineEmits(['close'])

const handleDownload = () => {
    addToast('Descargando reporte...', 'info')
}
</script>

<template>
    <BaseModal :is-open="isOpen" @close="$emit('close')">
        <template #header>
            <div class="flex items-center gap-4">
                <div class="p-2 bg-brand/10 rounded-lg">
                    <font-awesome-icon icon="file-lines" class="text-brand" />
                </div>
                <h3 class="text-xl font-bold text-white uppercase tracking-widest">
                    Reporte Post-Misión
                </h3>
            </div>
        </template>

        <template #default>
            <div v-if="launch" class="space-y-6">
                <div
                    class="w-full h-64 bg-black rounded-xl border border-white/10 relative flex items-center justify-center group cursor-pointer overflow-hidden"
                >
                    <img
                        src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070&auto=format&fit=crop"
                        class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    />
                    <font-awesome-icon
                        icon="circle-play"
                        class="text-6xl text-brand z-10 group-hover:scale-110 transition-transform duration-300 shadow-2xl"
                    />
                </div>

                <div>
                    <h2 class="text-3xl font-bold text-white mb-2">{{ launch.name }}</h2>
                    <div class="flex items-center gap-3 mb-4">
                        <AppBadge :active="launch.success" />
                        <span class="text-muted text-sm font-mono tracking-widest"
                            >CODE: {{ launch.id }}</span
                        >
                    </div>

                    <div class="bg-brand/5 border border-brand/20 p-4 rounded-xl">
                        <h4 class="text-brand font-bold text-sm uppercase mb-2">
                            Análisis de Telemetría
                        </h4>
                        <p class="text-muted leading-relaxed">
                            {{
                                launch.details ||
                                'Telemetría clasificada o no disponible para esta misión'
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <button
                @click="$emit('close')"
                class="px-6 py-2 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors cursor-pointer"
            >
                Cerrar Reporte
            </button>
            <button
                @click="handleDownload"
                class="px-6 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand-hover transition-colors shadow-2xl cursor-pointer"
            >
                Descargar Log (PDF)
            </button>
        </template>
    </BaseModal>
</template>
