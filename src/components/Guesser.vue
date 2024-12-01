<script setup lang="ts">
import type { Pokemon } from '@/librairies/api';

// Normalement, il n'y a qu'un seul pokemon dans la liste: celui à afficher
const props = defineProps<{pokemons: Pokemon[]}>();
let pok:Pokemon = props.pokemons[0]
</script>

<template>
  <div>
    <img :src="pok.image" :alt="pok.nom"/>
  </div>
</template>

<style scoped>
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #e9e9e9;
      border-radius: 20px;
      border: solid 1px;
    }

    img {
      width: 400px;
    }
</style>