import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import store from './store'

import 'sweetalert2/dist/sweetalert2.min.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap"

const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)
app.use(store)
app.mount('#app')
