export const createMount = ({ id, createApp, agent, agentOptions }) => {
    const mount = () => {
        const app = createApp()
        app.use(agent, { ...agentOptions, id })
        app.msaMount()
    }
    window.msaMounts ??= {}
    window.msaMounts[id] = mount
    return mount
}
