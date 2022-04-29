<script setup>

</script>

<template>
    <p><router-link :to="{name: 'Page1'}">sub-app1::Page1 (via name)</router-link></p>
    <p><router-link :to="{name: 'Page2'}">sub-app1::Page2 (via name)</router-link></p>
    <p><router-link to="/">sub-app1::Page1 (via path)</router-link></p>
    <p><router-link to="/2">sub-app1::Page2 (via path)</router-link></p>
    <router-view/>
</template>

<style>
#sub-app1 {
    color: deepskyblue;
}
</style>
