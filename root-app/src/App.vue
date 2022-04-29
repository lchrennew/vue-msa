<script setup>
</script>

<template>
    <sub-app base="/sub-app1/" name="sub-app1"/>
    <sub-app base="/sub-app2/" name="sub-app2"/>
    <p><router-link :to="{name: 'Page1'}">root::Page1 (via name)</router-link></p>
    <p><router-link :to="{name: 'Page2'}">root::Page2 (via name)</router-link></p>
    <p><router-link to="/">root::Page1 (via path)</router-link></p>
    <p><router-link to="/2">root::Page2 (via path)</router-link></p>
    <router-view/>
</template>

<style>
#root-app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    width: 300px;
}
a{
    color: darkgray;
    text-decoration: none;
}
a:hover{
    color: deepskyblue;
}

div{
    border: solid 1px #42b983;
    margin: 1em;
}
</style>
