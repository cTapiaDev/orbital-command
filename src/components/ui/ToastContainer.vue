<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
    <Teleport to="body">
        <div class="fixed top-6 right-6 z-100 flex flex-col gap-3 pointer-events-none">
            <TransitionGroup name="toast">
                <div
                    v-for="toast in toasts"
                    :key="toast.id"
                    class="pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/10"
                    :class="
                        toast.type === 'success'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-brand/20 text-brand'
                    "
                >
                    <font-awesome-icon icon="bell" class="text-lg" />
                    <p class="font-bold tracking-wider text-sm">{{ toast.message }}</p>
                    <button
                        @click="removeToast(toast.id)"
                        class="ml-4 hover:text-white transition-colors cursor-pointer"
                    >
                        <font-awesome-icon icon="xmark" />
                    </button>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(50px);
}

.toast-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>
