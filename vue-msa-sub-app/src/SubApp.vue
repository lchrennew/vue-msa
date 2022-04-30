<script setup>
import { onMounted } from "vue";
import { getApi } from 'es-fetch-api'

const props = defineProps({
    name: { type: String, required: true },
    base: { type: String, required: true }
})

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

const normalizeUrl = (url, base = location.origin) => {
    try {
        return new URL(url).href
    } catch (error) {
        return new URL(url, base).href
    }
}

const loadIndex = async ({ base }) => {
    const api = getApi(normalizeUrl(base))
    const response = await api('/index.html')
    return await response.text()
}

const loadApp = ({ base }) => loadIndex({ base }).then(html => loadAssets(html, base))

const nameDuplicated = document.getElementById(props.name)

if (!nameDuplicated)
    onMounted(() => loadApp(props))

</script>

<template>
    <div :id="name" v-if="!nameDuplicated"/>
</template>

<style scoped>

</style>
