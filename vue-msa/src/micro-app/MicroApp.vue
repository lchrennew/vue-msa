<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { loadApp } from "./load-app.js";


const props = defineProps({
    id: { type: String, required: true },
    base: { type: String, required: true },
    routerBase: { type: String, default: '/' },
    index: { type: String, default: '/index.html' }
})

const nameDuplicated = document.getElementById(props.id)

if (!nameDuplicated) {
    localStorage.setItem(`${props.id}.router-base`, props.routerBase)
    onMounted(() => loadApp(props))

    onBeforeUnmount(() => {
        const event = new Event(`unmount:${props.id}`)
        window.dispatchEvent(event)
    })
}
</script>

<template>
    <div :id="id" v-if="!nameDuplicated"/>
</template>

<style scoped>

</style>
