<script setup lang="ts">
    import toolbar from './components/Toolbar.vue';
    import Personnage from './components/Personnage.vue';
    import LivePokemons from './components/LivePokemons.vue';
    import { ref } from 'vue';
    import type {Pokemon} from "@/librairies/api"
    import pokemons from "@/json/pokemons.json"
    import { getNextQuestion, updateData } from './librairies/poserquestion';
    import Guesser from './components/Guesser.vue';
    let workingOnPokemons = ref(pokemons) // La liste de tous les pokemons à modifier
    let impossiblePokemons = ref(new Array<Pokemon>()) // La liste des pokemons éliminés par les questions
    let question = ref(getNextQuestion(workingOnPokemons.value)); // La question loadé dynamiquement
    let isGuessing = ref(false); 

    function updateQuestion() {
        question.value = getNextQuestion(workingOnPokemons.value)
    }
</script>

<template>
    <toolbar/>
    <main>
        <Personnage :question="question"
            @oui="updateData('oui', question, workingOnPokemons, impossiblePokemons), updateQuestion()"
            @non="updateData('non', question, workingOnPokemons, impossiblePokemons), updateQuestion()">
            {{ question.question }}
        </Personnage>
        <!-- Passage des variables au composant -->
        <div :class="{hidden: isGuessing}">
            <LivePokemons :pokemons="workingOnPokemons" :grised="impossiblePokemons"/>
        </div>
        <div :class="{hidden: !isGuessing}">
            <Guesser :pokemons="workingOnPokemons"/>
        </div>
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

    .hidden {
        display: none;
    }

    /* On screens that are 600px or less, set the background color to olive */
    @media screen and (max-width: 1000px) {
        main {
            flex-direction: column;
        }
    }
</style>