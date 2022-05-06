export default {
    install(app, options) {
        const { id } = options ?? {}
        app.id = id
        window.msaApps ??= {}
        window.msaApps[id] = app
        app.msaMount = () => {
            app.mount(`#${id}`)
        }

        window.addEventListener(`unmount:${id}`, () => app.unmount(), { once: true })
    }
}
