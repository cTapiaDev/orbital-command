import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

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
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
