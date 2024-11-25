<script setup lang="ts">
    import toolbar from './components/Toolbar.vue';
    import Personnage from './components/Personnage.vue';
    import LivePokemons from './components/LivePokemons.vue';
    import {listPokemon} from "@/librairies/listPokemon";
    import { ref } from 'vue';
    import type {Pokemon} from "@/librairies/api";


    let workingOnPokemons = ref(new Array<Pokemon>()); // La liste de tous les pokemons à modifier
    let impossiblePokemons = ref(new Array<Pokemon>()) // La liste des pokemons éliminés par les questions
    // Variable pour activer / désactiver les boutons le temps que les données soient chargées
    let isDataLoaded = ref(false)
    let question = ref("Nous chargeons les données...") // La question loadé dynamiquement

    listPokemon().then((tab) => callback(tab)) // Requete à l'API pour la liste de pokemons

    /**
     * Fonction de traitement des données récupérées
     * @param tabOfPokemons
     */
    function callback(tabOfPokemons:Pokemon[]) {
        workingOnPokemons.value = tabOfPokemons // Affecte les pokemons à la variable
        isDataLoaded.value = true
        question.value = "La question à poser..."
    }
</script>

<template>
    <toolbar/>
    <main>
        <Personnage :disable="!isDataLoaded">
          {{ question }}
        </Personnage>
        <!-- Passage des variables au composant -->
        <LivePokemons :isDataLoaded="isDataLoaded" :pokemons="workingOnPokemons" :grised="impossiblePokemons"/>
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