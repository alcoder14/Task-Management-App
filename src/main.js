import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faSquare, faTimes)

import { createPinia } from 'pinia'
const pinia = createPinia()

import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.component("font-awesome-icon", FontAwesomeIcon)

app.config.globalProperties.emitter = emitter
app.mount("#app")
