<script setup>
import { getApi } from 'es-fetch-api'

const loadSubApp2 = async () => {
    const api = getApi(`${location.origin}/sub-app2`)
    const response = await api('/index.html')
    const html = await response.text()
    const div = document.createElement('div')
    div.innerHTML = html
    console.log(html);
    document.body.append(
        ...[ ...div.querySelectorAll('script') ].map(s => {
            const script = document.createElement(s.tagName);
            [ ...s.attributes ].forEach(attr => script.setAttribute(attr.name, attr.value))
            return script
        }),
        ...[ ...div.querySelectorAll('link[rel="stylesheet"]') ].map(s => {
            const script = document.createElement(s.tagName);
            [ ...s.attributes ].forEach(attr => script.setAttribute(attr.name, attr.value))
            return script
        }),
    )
    // document.body.append(...div.getElementsByTagName('script'))

}
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
