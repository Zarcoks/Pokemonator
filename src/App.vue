<script setup lang="ts">
    import toolbar from './components/Toolbar.vue';
    import Personnage from './components/Personnage.vue';
    import LivePokemons from './components/LivePokemons.vue';
    import { ref } from 'vue';
    import type {Pokemon} from "@/librairies/api"
    import pokemons from "@/json/pokemons.json"
    import { getNextQuestion, updateData } from './librairies/poserquestion';



    let workingOnPokemons = ref(pokemons) // La liste de tous les pokemons à modifier
    let impossiblePokemons = ref(new Array<Pokemon>()) // La liste des pokemons éliminés par les questions
    // Variable pour activer / désactiver les boutons le temps que les données soient chargées
    //let isDataLoaded = ref(false)
    let question = ref(getNextQuestion(workingOnPokemons.value)); // La question loadé dynamiquement

    console.log(question.value);

    //listPokemon().then((tab) => callback(tab)) // Requete à l'API pour la liste de pokemons

    /**
     * Fonction de traitement des données récupérées
     * @param tabOfPokemons
     *
    function callback(tabOfPokemons:Pokemon[]) {
        console.log(tabOfPokemons);
        
        workingOnPokemons.value = tabOfPokemons // Affecte les pokemons à la variable
        isDataLoaded.value = true
        question.value = "La question à poser..."
    }
        */
    function updateQuestion() {
        question.value = getNextQuestion(workingOnPokemons.value)
    }
</script>

<template>
    <toolbar/>
    <main>
        <Personnage :question="question"
            @oui="updateData('oui', question, workingOnPokemons, impossiblePokemons), updateQuestion()"
            @non="updateData('non', question, workingOnPokemons, impossiblePokemons), updateQuestion()"
            @jsp="updateData('jsp', question, workingOnPokemons, impossiblePokemons), updateQuestion()">
            {{ question.question }}
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