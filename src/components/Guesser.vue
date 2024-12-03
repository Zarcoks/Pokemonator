<script setup lang="ts">
import type { Pokemon } from '@/librairies/api';
import { ref } from 'vue';
import Replay from './replay.vue';

// Normalement, il n'y a qu'un seul pokemon dans la liste: celui à afficher
const props = defineProps<{pokemons: Pokemon[], replay: Function}>();

let isMain = ref(true)
let isWon = ref(false)
let isLose = ref(false)

let loserImg =  ref(new URL('../assets/profChenenpls.png', import.meta.url).href)
let winnerImg =  ref(new URL('../assets/winner.png', import.meta.url).href)

function onYes() {
  isMain.value = false
  isWon.value = true
  isLose.value = false
}
function onNo() {
  isMain.value = false
  isWon.value = false
  isLose.value = true
}

function replay() {
  isMain.value = true
  isWon.value = false
  isLose.value = false
  props.replay() 
}
</script>

<template>
  <div :class="{hidden: !isMain}">
    <h1>Penses - tu à {{ pokemons[0].nom }} ?</h1>
    <div id="whole">
      <button @click="onYes()">Oui</button>
      <div id="guessingPokemon">
        <img :src="pokemons[0].image" :alt="pokemons[0].nom"/>
      </div>
      <button @click="onNo()">Non</button>
    </div>
  </div>
  
  <div :class="{hidden: !isWon}">
    <Replay :callback="replay" :src="winnerImg" :message="'Ton pokemon était ' + props.pokemons[0].nom + ' !'"/>
  </div>
  
  <div :class="{hidden: !isLose}">
    <Replay :callback="replay" :src="loserImg" :message="'Mince! Je n\'ai pas trouvé ton pokemon...'"/>
  </div>
</template>

<style scoped>
    #guessingPokemon {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: url("../assets/ciel.jpg");
      border-radius: 20px;
      border: solid 1px;
    }

    #whole {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 80vw;
    }

    #whole > button {
      width: 100px;
      height: 100px;
    }

    h1 {
      text-align: center;
      font-family: 'Pokemon Solid', sans-serif;
    }

    img {
      width: 400px;
    }

    .hidden {
      display: none;
    }
</style>