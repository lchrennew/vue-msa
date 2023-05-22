import { createRouter, createWebHistory } from "vue-router";
import Agent from "./agent.js";

export default {
    install(app, options) {
        const {
            group = 'msa-route',
            id,
            createHistory = createWebHistory,
            routerOptions
        } = options
        app.use(Agent, { id })
        const router = createRouter({
            ...routerOptions,
            history: createHistory(localStorage.getItem(`${id}.router-base`)),
        })

        const { base } = router.options.history
        router.afterEach((to, from, failure) => {
            if (failure) return;
            if (to.meta?.routeGroup && to.meta.routeGroup !== group) return; // Use this to partially sync routes by group

            const event = new Event(group)
            event.to = to
            window.dispatchEvent(event)
        })
        const syncRoute = event => {
            console.debug('[msa]to.href=', event.to.href)
            router.replace(
                createHistory.name === createWebHistory.name
                    ? event.to.href.substring(base.length)
                    : event.to.href.substring(1));
        }

        window.addEventListener(group, syncRoute)
        window.addEventListener(
            `unmount:${id}`,
            () => window.removeEventListener(group, syncRoute), { once: true })

        app.use(router)
    }
}
