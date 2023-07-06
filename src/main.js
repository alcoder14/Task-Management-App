import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faSquare)

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
