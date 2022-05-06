export default {
    install(app, options) {
        const { id } = options ?? {}
        app.msaMount = () => app.mount(`#${id}`)
        window.addEventListener(`unmount:${id}`, () => app.unmount(), { once: true })
    }
}
