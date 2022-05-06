import MicroApp from '../micro-app/MicroApp.vue'

export default {
    install(app, options) {
        app.component('micro-app', MicroApp)
    }
}
