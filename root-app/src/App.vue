<script setup>
import { getApi } from 'es-fetch-api'

const cloneNodes = (root, selector) => [ ...root.querySelectorAll(selector) ].map(el => {
    const script = document.createElement(el.tagName);
    [ ...el.attributes ].forEach(attr => script.setAttribute(attr.name, attr.value))
    return script
})

const loadAssets = html => {
    const div = document.createElement('div')
    div.innerHTML = html
    document.body.append(...cloneNodes(div, 'script, link[rel="stylesheet"]'))
}

const loadIndex = async ({ base }) => {
    const api = getApi(base)
    const response = await api('/index.html')
    return await response.text()
}

const loadApp = async ({ base }) => {
    const html = await loadIndex({ base })
    loadAssets(html)
}

const loadSubApp2 = () => loadApp({ base: `${location.origin}/sub-app2` })
loadSubApp2()
</script>

<template>
    <div id="sub-app1"></div>
    <div id="sub-app2"></div>
</template>

<style>
#root-app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
