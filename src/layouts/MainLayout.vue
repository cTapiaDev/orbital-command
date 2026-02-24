<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
    <div class="flex h-screen w-full bg-space-black">
        <aside class="w-64 flex flex-col border-r border-white/5 bg-space-panel">
            <div class="h-20 flex items-center px-6 border-b border-white/5">
                <font-awesome-icon
                    icon="shuttle-space"
                    class="text-brand text-2xl mr-3 animate-pulse"
                />
                <div>
                    <h1 class="text-lg font-bold tracking-widest text-white uppercase">Orbital</h1>
                    <span class="text-2xs text-brand tracking-[0.3em] block uppercase"
                        >Command</span
                    >
                </div>
            </div>

            <nav class="flex-1 py-6 space-y-2 px-3">
                <RouterLink
                    to="/"
                    class="flex items-center px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-all rounded-lg group"
                    active-class="bg-brand/10 text-brand border-r-4 border-brand"
                >
                    <font-awesome-icon
                        icon="chart-pie"
                        class="mr-3 w-5 group-hover:text-brand transition-colors"
                    />
                    Dashboard
                </RouterLink>

                <RouterLink
                    to="/rockets"
                    class="flex items-center px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-all rounded-lg group"
                    active-class="bg-brand/10 text-brand border-r-4 border-brand"
                >
                    <font-awesome-icon
                        icon="rocket"
                        class="mr-3 w-5 group-hover:text-brand transition-colors"
                    />
                    Flota
                </RouterLink>

                <RouterLink
                    to="/launches"
                    class="flex items-center px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-all rounded-lg group"
                    active-class="bg-brand/10 text-brand border-r-4 border-brand"
                >
                    <font-awesome-icon
                        icon="jedi"
                        class="mr-3 w-5 group-hover:text-brand transition-colors"
                    />
                    Misiones
                </RouterLink>
            </nav>

            <div class="p-6 border-t border-white/5 bg-black/20">
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center border border-brand/50"
                    >
                        <font-awesome-icon icon="user-astronaut" class="text-brand" />
                    </div>
                    <div>
                        <p class="text-sm font-bold text-white">Cmdr. Shepard</p>
                        <p class="text-2xs text-muted uppercase">Acceso Nivel 5</p>
                    </div>
                </div>
            </div>
        </aside>

        <main class="flex-1 flex flex-col relative">
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-brand)_0%,_transparent_20%)] opacity-15 pointer-events-none"
            ></div>

            <div class="flex-1 overflow-y-auto p-10">
                <RouterView />
            </div>
        </main>
    </div>
</template>
