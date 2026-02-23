<script setup>
const model = defineModel()
</script>

<template>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <font-awesome-icon icon="filter" class="text-muted" />
        </div>

        <select
            v-model="model"
            class="appearance-none block w-full pl-11 pr-10 py-3 bg-space-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand focus:ring-0"
        >
            <option value="all">Todas las Misiones</option>
            <option value="success">Exitosas</option>
            <option value="failed">Fallidas</option>
        </select>

        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <font-awesome-icon icon="caret-down" class="text-muted" />
        </div>
    </div>
</template>
