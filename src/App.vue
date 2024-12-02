<script setup lang="ts">
    import toolbar from './components/Toolbar.vue';
    import Personnage from './components/Personnage.vue';
    import LivePokemons from './components/LivePokemons.vue';
    import { computed, ref } from 'vue';
    import type {Pokemon} from "@/librairies/api"
    import pokemons from "@/json/pokemons.json"
    import { getNextQuestion, updateData } from './librairies/poserquestion';
    import Guesser from './components/Guesser.vue';
    let workingOnPokemons = ref(pokemons) // La liste de tous les pokemons à modifier
    let impossiblePokemons = ref(new Array<Pokemon>()) // La liste des pokemons éliminés par les questions
    let question = ref(getNextQuestion(workingOnPokemons.value)); // La question loadé dynamiquement

    // Variables d'état, pour déterminer quel composant est à afficher (une seule à la fois)
    let isGuessing = ref(false)
    let isAsking = ref(true)
    let isLoosing = ref(false)

    function replay() {

    }

    function allFalse() {
        isGuessing.value = false
        isAsking.value = false
        isLoosing.value = false
    } 

    function updateState() {
        question.value = getNextQuestion(workingOnPokemons.value)
        if (workingOnPokemons.value.length === 1) {
            allFalse()
            isGuessing.value = true
        }
        else if (workingOnPokemons.value.length < 1){
            allFalse()
            isLoosing.value = true
        }
        else if (workingOnPokemons.value.length > 1) {
            allFalse()
            isAsking.value = true;
        } 
    }
</script>

<template>
    <toolbar/>
    <main>
        <div :class="{hidden: isGuessing}">
            <Personnage :question="question"
                @oui="updateData('oui', question, workingOnPokemons, impossiblePokemons), updateState()"
                @non="updateData('non', question, workingOnPokemons, impossiblePokemons), updateState()">
                {{ question.question }}
            </Personnage>
        </div>
        <!-- Passage des variables au composant -->
        <div :class="{hidden: !isAsking}">
            <LivePokemons :pokemons="workingOnPokemons" :grised="impossiblePokemons"/>
        </div>
        <div :class="{hidden: !isGuessing}">
            <Guesser :pokemons="workingOnPokemons" :replay="replay"/>
        </div>
        <div :class="{hidden: !isLoosing}">

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