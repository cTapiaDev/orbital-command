<script setup>
defineProps({
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    icon: { type: String, default: 'chart-pie' },
    color: { type: String, default: 'text-brand' },
})
</script>

<template>
    <div
        class="bg-space-panel border border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:border-brand/30 transition-colors group"
    >
        <div class="p-4 rounded-xl bg-white/5 group-hover:bg-brand/10 transition-colors">
            <font-awesome-icon :icon="icon" class="text-2xl" :class="color" />
        </div>
        <div>
            <h3 class="text-muted text-xs uppercase tracking-widest mb-1">{{ title }}</h3>
            <p class="text-2xl font-bold text-white">{{ value }}</p>
        </div>
    </div>
</template>
