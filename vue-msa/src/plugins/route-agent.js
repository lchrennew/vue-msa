import { createRouter, useRouter } from "vue-router";

export const createRouteAgent = options => ({
    install(app) {
        const { group = 'msa-route', router, id } = options ?? {}
        router.afterEach((to, from, failure) => {
            if (failure) return;
            if (to.group && to.group !== group) return;

            const event = new Event(group)
            event.to = to
            window.dispatchEvent(event)
        })

        const syncRoute = event => router.replace(event.to.href)

        window.addEventListener(group, syncRoute)
        window.addEventListener(`unmount:${id}`, () => window.removeEventListener(group, syncRoute), { once: true })
    }
})
