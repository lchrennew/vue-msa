import SubApp from './SubApp.vue'

export default {
    install(app, options) {
        app.component('sub-app', SubApp)
    }
}
