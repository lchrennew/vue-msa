import { getApi } from 'es-fetch-api'

const cloneNodes = (root, selector) => [ ...root.querySelectorAll(selector) ].map(el => {
    const node = document.createElement(el.tagName);
    [ ...el.attributes ].forEach(attr => node.setAttribute(attr.name, attr.value))
    return node
})

const rebaseAssets = (html, base) =>
    html.replace(
        /(?<= (?:src|href)=")([^"]+)(?=")/g, match => normalizeUrl(match, base))

const loadAssets = (html, base) => {
    const div = document.createElement('div')
    div.innerHTML = rebaseAssets(html, base)
    document.head.append(...cloneNodes(div, 'script, link[rel="stylesheet"]'))
}

const removeStartSlash = href => href.replace(/^\//, '')

const normalizeUrl = (url, base = location.origin) => {
    try {
        return new URL(url).href
    } catch (error) {
        return new URL(removeStartSlash(url), normalizeUrl(base)).href
    }
}

const loadIndex = async ({ base, index = '/index.html' }) => {
    const api = getApi(normalizeUrl(base))
    const response = await api(index)
    return await response.text()
}

export const loadApp = ({ id, base, index }) => {
    window.msaApps ??= {}
    const app = window.msaApps[id]
    if (app) {
        app.msaMount()
        return
    }
    loadIndex({ base, index }).then(html => loadAssets(html, base))
}
