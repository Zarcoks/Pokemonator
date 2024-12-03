<script setup lang="ts">
    import toolbar from './components/Toolbar.vue';
    import Personnage from './components/Personnage.vue';
    import LivePokemons from './components/LivePokemons.vue';
    import { ref } from 'vue';
    import {type Pokemon} from "@/librairies/api"
    import pokemons from "@/json/pokemons.json"
    import { getNextQuestion, updateData } from './librairies/poserquestion';
    import Guesser from './components/Guesser.vue';
    
    let imgProfesseur = ref(new URL('./assets/chen-akinator.png', import.meta.url).href)

    let workingOnPokemons = ref([...pokemons]) // La liste de tous les pokemons à modifier
    let impossiblePokemons = ref(new Array<Pokemon>()) // La liste des pokemons éliminés par les questions
    let question = ref(getNextQuestion(workingOnPokemons.value)); // La question loadé dynamiquement

    // Variables d'état, pour déterminer quel composant est à afficher (une seule à la fois)
    let isNotStarted = ref(true)
    let isGuessing = ref(false)
    let isAsking = ref(false)

    function start() {
        allFalse()
        isAsking.value = true;
    }

    function replay() {
        impossiblePokemons.value = new Array<Pokemon>()
        workingOnPokemons.value = [...pokemons]
        updateState()
    }

    function allFalse() {
        isNotStarted.value = false
        isGuessing.value = false
        isAsking.value = false
    } 

    function updateState() {
        let nextQuestion = getNextQuestion(workingOnPokemons.value)
        if (nextQuestion !== null) question.value = nextQuestion
        
        if (nextQuestion === null || workingOnPokemons.value.length === 1) {
            allFalse()
            isGuessing.value = true            
        }
        else if (workingOnPokemons.value.length === pokemons.length) {
            allFalse()
            isNotStarted.value = true
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
        <div :class="{hidden: !isNotStarted}">
            <div>
                <img :src="imgProfesseur" alt="">
                <div>
                    <h1>Bienvenue sur Pokemonator !</h1>
                    <p>Pensez à un pokemon, et quand vous êtes prêt, appuyez sur 'commencer' !</p>
                    <button @click="start">Commencer !</button>
                </div>
            </div>
        </div>
        <div :class="{hidden: !isAsking}">
            <Personnage :question="question"
                @oui="updateData('oui', question, workingOnPokemons, impossiblePokemons), updateState()"
                @non="updateData('non', question, workingOnPokemons, impossiblePokemons), updateState()"
                @replay="replay()">
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

    main > div:first-child > div {
        display: flex;
        align-items: center;
    }
    
    main > div:first-child > div > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        text-align: center
    }

    .hidden {
        display: none;
    }

    img {
        height: 80vh;
        margin-right: 30px;
    }

    /* On screens that are 600px or less, set the background color to olive */
    @media screen and (max-width: 1000px) {
        main {
            flex-direction: column;
        }
    }
</style>