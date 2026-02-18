import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import RocketsView from '@/views/RocketsView.vue'
import RocketDetailView from '@/views/RocketDetailView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: DashboardView,
                },
                {
                    path: 'rockets', // Representa la ruta (/rockets)
                    name: 'rockets',
                    component: RocketsView,
                },
                {
                    path: 'rockets/:id',
                    name: 'rocket-detail',
                    component: RocketDetailView,
                    props: true,
                },
            ],
        },
    ],
})

export default router
