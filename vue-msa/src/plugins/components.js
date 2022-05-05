import MicroApp from './MicroApp.vue'

export default {
    install(app, options) {
        app.component('micro-app', MicroApp)
    }
}
