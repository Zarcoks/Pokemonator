<script setup lang="ts">
    import toolbar from './components/Toolbar.vue';
    import Personnage from './components/Personnage.vue';
    import LivePokemons from './components/LivePokemons.vue';
    import {getPokemon} from "@/librairies/api";
    getPokemon(2)
</script>

<template>
    <toolbar/>
    <main>
        <Personnage>
            Une question pas spécialement intéressant mais particulièrement longueur pour tester le style
        </Personnage>
        <LivePokemons/>
    </main>
</template>

<style scoped>
    main {
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
</style>