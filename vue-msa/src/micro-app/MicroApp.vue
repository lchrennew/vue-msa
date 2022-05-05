<script setup>
import { onMounted } from "vue";
import { loadApp } from "./sub-app.js";


const props = defineProps({
    name: { type: String, required: true },
    base: { type: String, required: true },
    index: {type:String, default: '/index.html'}
})

const nameDuplicated = document.getElementById(props.name)

if (!nameDuplicated)
    onMounted(() => loadApp(props))

</script>

<template>
    <div :id="name" v-if="!nameDuplicated"/>
</template>

<style scoped>

</style>
