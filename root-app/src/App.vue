<script setup>
import SubApp from "./components/SubApp.vue";
</script>

<template>
    <div id="sub-app1"></div>
    <sub-app base="/sub-app1/" name="sub-app1"/>
    <sub-app base="/sub-app2/" name="sub-app2"/>
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
