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
    document.body.append(...cloneNodes(div, 'script, link[rel="stylesheet"]'))
}

const removeStartSlash = href=>href.replace(/^\//, '')

const normalizeUrl = (url, base = location.origin) => {
    try {
        return new URL(url).href
    } catch (error) {
        return new URL(removeStartSlash(url), normalizeUrl(base)).href
    }
}

const loadIndex = async ({ base }) => {
    const api = getApi(normalizeUrl(base))
    const response = await api('/index.html')
    return await response.text()
}

export const loadApp = ({ base }) => loadIndex({ base }).then(html => loadAssets(html, base))
