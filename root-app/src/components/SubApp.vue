<script setup>
import { onMounted } from "vue";
import { getApi } from 'es-fetch-api'

const props = defineProps({
    name: { type: String, required: true },
    base: { type: String, required: true }
})

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

const normalizeUrl = url => {
    try {
        return new URL(url).href
    } catch (error) {
        return new URL(url, location.origin).href
    }
}

const loadIndex = async ({ base }) => {
    const api = getApi(normalizeUrl(base))
    const response = await api('/index.html')
    return await response.text()
}

const loadApp = ({ base }) => loadIndex({ base }).then(loadAssets)

const nameDuplicated = document.getElementById(props.name)

if (!nameDuplicated)
    onMounted(() => loadApp(props))

</script>

<template>
    <div :id="name" v-if="!nameDuplicated"/>
</template>

<style scoped>

</style>
