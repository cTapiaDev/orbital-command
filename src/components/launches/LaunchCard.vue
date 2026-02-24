<script setup>
import AppBadge from '../ui/AppBadge.vue'

defineProps({
    launch: { type: Object, required: true },
    formattedDate: { type: String, required: true },
})

const emit = defineEmits(['view-details'])
</script>

<template>
    <article
        class="bg-space-panel border border-white/5 rounded-2xl p-6 hover:border-brand/30 transition-colors group"
    >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
                <h3
                    class="text-xl font-bold text-white group-hover:text-brand transition-color mb-1"
                >
                    {{ launch.name }}
                </h3>
                <p class="text-sm text-muted flex items-center gap-2">
                    <font-awesome-icon icon="calendar-day" />
                    {{ formattedDate }}
                </p>
            </div>
            <AppBadge :active="launch.success" />
        </div>
        <p class="text-muted text-sm leading-relaxed mb-4">
            {{ launch.details || 'Sin detalles disponibles para esta misión' }}
        </p>

        <button
            @click="emit('view-details', launch)"
            class="w-full py-3 rounded-xl bg-white/5 text-white text-sm font-bold border border-white/5 hover:bg-brand/70 hover:border-brand transition-all uppercase tracking-widest cursor-pointer mt-auto"
        >
            Abrir Reporte
        </button>
    </article>
</template>
