import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

import { vObserve } from './directives/vObserve'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
    faRocket,
    faBars,
    faShuttleSpace,
    faChartPie,
    faUserAstronaut,
    faCircleCheck,
    faCircleXmark,
    faMoneyBillWave,
    faWeightHanging,
    faRulerVertical,
    faFire,
    faDatabase,
    faArrowRight,
    faArrowLeft,
    faGear,
    faMagnifyingGlass,
    faFilter,
    faCaretDown,
    faCalendarDay,
    faJedi,
    faXmark,
    faFileLines,
    faCirclePlay,
    faBell,
    faSatelliteDish,
    faSatellite,
    faChartBar,
    faMicrochip,
    faStar,
    faTerminal,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faRocket,
    faBars,
    faShuttleSpace,
    faChartPie,
    faUserAstronaut,
    faCircleCheck,
    faCircleXmark,
    faMoneyBillWave,
    faWeightHanging,
    faRulerVertical,
    faFire,
    faDatabase,
    faArrowRight,
    faArrowLeft,
    faGear,
    faMagnifyingGlass,
    faFilter,
    faCaretDown,
    faCalendarDay,
    faJedi,
    faXmark,
    faFileLines,
    faCirclePlay,
    faBell,
    faSatelliteDish,
    faSatellite,
    faChartBar,
    faMicrochip,
    faStar,
    faTerminal,
)

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.directive('observe', vObserve)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)
app.mount('#app')
