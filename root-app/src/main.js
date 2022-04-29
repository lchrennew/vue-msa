import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routerBus from 'vue-msa-router-bus'
import Page1 from "./pages/Page1.vue";
import Page2 from "./pages/Page2.vue";


const routes = [ {
    name: 'Page1', path: '/', component: Page1
}, {
    name: 'Page2', path: '/2', component: Page2
} ]

const router = createRouter({
    history: createWebHistory(), routes,
})

createApp(App)
    .use(router)
    .use(routerBus)
    .mount('#root-app')

