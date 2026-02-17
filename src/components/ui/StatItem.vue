<script setup>
defineProps({
    icon: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: [String, Number], required: true },
})
</script>

<template>
    <div
        class="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
    >
        <font-awesome-icon :icon="icon" class="text-brand mb-1 text-sm" />
        <span class="text-white font-bold text-sm">{{ value }}</span>
        <span class="text-2xs text-muted uppercase tracking-wider">{{ label }}</span>
    </div>
</template>
