import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/auth/LoginView.vue'),
            meta: { requiresAuth: false },
        },
        {
            path: '/',
            component: MainLayout,
            meta: { requiresAuth: true },
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

// Router Guard Global
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login' })
    } else if (to.name === 'login' && authStore.isAuthenticated) {
        next({ name: 'dashboard' })
    } else {
        next()
    }
})

export default router
