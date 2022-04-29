import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Page1 from "./pages/Page1.vue";
import Page2 from "./pages/Page2.vue";

const appName = `sub-app2`
const appId = `#${appName}`

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

// router.afterEach((from, to, failure) => {
//     if (!failure) {
//         const event = new Event('route')
//         document.querySelector(appId).dispatchEvent(event)
//     }
// })

const app = createApp(App)
    .use(router)
    .mount(appId)

window.addEventListener('msa-route', event => {
    router.replace(event.to.href)
})
