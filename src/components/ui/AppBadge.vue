<script setup>
defineProps({
    active: { type: Boolean, default: false },
})
</script>

<template>
    <span
        class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-2xs font-bold uppercase tracking-widest border"
        :class="
            active
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        "
    >
        <font-awesome-icon :icon="active ? 'circle-check' : 'circle-xmark'" />
        {{ active ? 'Activo' : 'Retirado' }}
    </span>
</template>
