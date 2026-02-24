<script setup>
defineProps({
    isOpen: { type: Boolean, required: true },
    title: { type: String, default: 'Detalles' },
})

defineEmits(['close'])
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    class="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    @click="$emit('close')"
                ></div>

                <div
                    class="relative w-full max-w-2xl bg-space-panel border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] z-10"
                >
                    <header class="flex items-center justify-between p-6 border-b border-white/5">
                        <slot name="header">
                            <h3 class="text-xl font-bold text-white">{{ title }}</h3>
                        </slot>

                        <button
                            @click="$emit('close')"
                            class="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-rose-500/20 text-muted hover:text-rose-400 transition-colors cursor-pointer"
                        >
                            <font-awesome-icon icon="xmark" />
                        </button>
                    </header>

                    <div class="p-6 overflow-y-auto flex-1 custom-scrollbar">
                        <slot>
                            <p class="text-muted">Contenido por defecto del modal...</p>
                        </slot>
                    </div>

                    <footer
                        class="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-4 rounded-b-2xl"
                    >
                        <slot name="footer">
                            <button
                                @click="$emit('close')"
                                class="px-6 py-2 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors"
                            >
                                Cerrar
                            </button>
                        </slot>
                    </footer>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.5s;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.1);
    transition: all 0.5s;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(56, 189, 248, 0.3);
    border-radius: 10px;
}
</style>
