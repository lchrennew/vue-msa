import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Page1 from "./pages/Page1.vue";
import Page2 from "./pages/Page2.vue";


const routes = [
    {
        name: 'Page1',
        path: '/',
        component: Page1
    },
    {
        name: 'Page2',
        path: '/2',
        component: Page2
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to, from, failure) => {
    if(!failure){
        const event = new Event('msa-route')
        event.to = to
        event.from = from
        window.dispatchEvent(event)
    }
})
window.addEventListener('msa-route', event => router.replace(event.to.href))

const app = createApp(App)
    .use(router)
    .mount('#root-app')

