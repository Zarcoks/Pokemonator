<script setup lang="ts">
    import toolbar from './components/toolbar.vue';
    import Personnage from './components/Personnage.vue';
    import {getPokemon} from "@/librairies/api";
    getPokemon(2)
</script>

<template>
    <toolbar/>
    <Personnage/>
</template>

<style scoped>
    
</style>