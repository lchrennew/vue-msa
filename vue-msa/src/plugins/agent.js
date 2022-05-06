export default {
    install(app, options) {
        const { id } = options ?? {}
        window.addEventListener(`unmount:${id}`, () => app.unmount(), { once: true })
    }
}
