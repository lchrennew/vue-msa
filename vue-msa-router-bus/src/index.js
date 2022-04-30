export const createRouterBus = options => ({
    install: app => {
        const router = app.config.globalProperties.$router
        if (!router) throw 'You must use vue-router plugin first'

        const { busName = 'msa-route' } = options ?? {}
        router.afterEach((to, from, failure) => {
            if (failure) return;
            if (to.busName && to.busName !== busName) return;

            const event = new Event(busName)
            event.to = to
            window.dispatchEvent(event)
        })
        window.addEventListener(busName, event => router.replace(event.to.href))
    }
})
