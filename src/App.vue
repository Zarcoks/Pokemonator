<script setup lang="ts">
    import toolbar from './components/Toolbar.vue';
    import Personnage from './components/Personnage.vue';
    import LivePokemons from './components/LivePokemons.vue';
    import {listPokemon} from "@/librairies/listPokemon";
    import { ref } from 'vue';
    import type {Pokemon} from "@/librairies/api";

    let workingOnPokemons = ref(new Array<Pokemon>()); // La liste de tous les pokemons à modifier
    let impossiblePokemons = ref(new Array<Pokemon>()) // La liste des pokemons éliminés par les questions

    listPokemon().then((tab) => callback(tab)) // Requete à l'API pour la liste de pokemons

    /**
     * Fonction de traitement des données récupérées
     * @param tabOfPokemons
     */
    function callback(tabOfPokemons:Pokemon[]) {
        console.log(tabOfPokemons);
        workingOnPokemons.value = tabOfPokemons // Affecte les pokemons à la variable
    }
</script>

<template>
    <toolbar/>
    <main>
        <Personnage>
            Une question pas spécialement intéressant mais particulièrement longueur pour tester le style
        </Personnage>
        <!-- Passage des variables au composant -->
        <LivePokemons :pokemons="workingOnPokemons" :grised="impossiblePokemons"/>
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