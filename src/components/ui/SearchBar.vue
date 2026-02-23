<script setup>
const emit = defineEmits(['updateSearch'])

const handleInput = (event) => {
    emit('updateSearch', event.target.value)
}
</script>

<template>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <font-awesome-icon icon="magnifying-glass" class="text-muted" />
        </div>

        <input
            type="text"
            @input="handleInput"
            placeholder="Buscar misión por nombre..."
            class="block w-full pl-11 pr-4 py-3 bg-space-black border border-white/10 rounded-xl text-white placeholder-muted focus:outline-none focus:border-brand focus:ring-0 transition-all"
        />
    </div>
</template>
