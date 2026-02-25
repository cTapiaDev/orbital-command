import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

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
                    component: () => import('@/views/DashboardView.vue'),
                },
                {
                    path: 'rockets', // Representa la ruta (/rockets)
                    name: 'rockets',
                    component: () => import('@/views/RocketsView.vue'),
                },
                {
                    path: 'rockets/:id',
                    component: () => import('@/views/RocketDetailView.vue'),
                    props: true,
                    children: [
                        {
                            path: '',
                            name: 'rocket-detail',
                            component: () => import('@/views/rocket-tabs/RocketOverview.vue'),
                        },
                        {
                            path: 'tech',
                            name: 'rocket-tech',
                            component: () => import('@/views/rocket-tabs/RocketTech.vue'),
                        },
                    ],
                },
                {
                    path: 'launches',
                    name: 'launches',
                    component: () => import('@/views/LaunchesView.vue'),
                },
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
        },
    ],
})

export default router
