<script setup>
defineProps({
    rocket: { type: Object, required: true },
})
</script>

<template>
    <div class="text-white">
        <h3 class="text-2xl font-bold mb-4">Especificaciones Técnicas</h3>
        <p class="text-muted">Cargando datos de {{ rocket.name }}...</p>
    </div>
</template>
