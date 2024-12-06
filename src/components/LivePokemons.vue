<script setup lang="ts">
import type {Pokemon} from "@/librairies/api";
import { computed } from "vue";

// Récupération et définition des variables utiles au fonctionnement du composant
const props = defineProps<{pokemons: Pokemon[], grised: Pokemon[]}>();

props.pokemons.forEach(pokemon => {
  pokemon.clicked = true
})
/**
 * Détermine is un pokemon doit être grisé ou pas
 * @param pokemon
 */
  function isGrised(pokemon:Pokemon) {
      return props.grised.indexOf(pokemon) >= 0;
  }

  /**
   * Retourne le tableau de TOUS les pokemons avec les non-grisés AVANT les grisés
   */
  function trierGrised() {
    return props.pokemons.concat(props.grised);
  }

  const pokemonFiltres = computed(trierGrised)

  function togglePokemon(pokemon: Pokemon) {
    let clicked = pokemon.clicked;
    props.pokemons.forEach((pok) => {
      pok.clicked = true
    })
    pokemon.clicked = !clicked
  }

</script>

<template>
  <div id="pokemons">
    <h2>Les pokemons auxquels je pense...</h2>
    <div>
        <article v-for="pok in pokemonFiltres" :class="{grised:(isGrised(pok))}" @click="togglePokemon(pok)">
          <div class="base">
            <img :src="pok.image" alt="pik"/>
            <span>{{ pok.nom }}</span>
          </div>
          <div :class="{infos: true, hidden: pok.clicked}">
            <h5> Les informations</h5>
            <span> type : {{pok.type}}</span>
            <span> phase chaine d'évolution : {{pok.nivEvolution}}</span>
            <span> poids : {{pok.poids/10}} kg</span>
            <span> taille : {{pok.taille*10}} cm</span>
            <span> couleur : {{pok.couleur}}</span>
            <span> bébé : {{pok.bebe ? "oui" : "non"}}</span>
            <span> légendaire : {{pok.legendaire ? "oui" : "non"}}</span>
            <span> mythique : {{pok.mythique ? "oui" : "non"}}</span>
            <span> habitat : {{pok.habitat}}</span>
            <span> forme : {{pok.forme}}</span>
            <span> évènement : {{pok.evenement === "" ? "Aucun" : pok.evenement }}</span>
            <span> Objet pour évoluer : {{pok.objetEvoltution ?? "non"}}</span>
          </div>
        </article>
    </div>
  </div>
</template>

<style scoped>
    #pokemons {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h2 {
      font-size: 1vw;
    }

    h5 {
      font-size: 0.7vw;
    }

    #pokemons > div {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        width: 20vw;
        height: 30vh;
        background-color: lightgray;
        border-radius: 20px;
        border: solid 1px;
    }

    img {
        width: 20%;
        margin: 5px;
    }

    span::first-letter {
      text-transform:capitalize;
    }

    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgb(230, 230, 230);
      border-bottom: solid 1px #ccc;
      padding: 10px;
      transition: all 200ms ease-out;
    }

    .base {
        display: flex;
        align-items: center;
        overflow-y : hidden;
        width: 100%;
    }

    .base > span {
      font-size: 0.8vw;
    }

    .hidden {
      display: none;
    }

    .infos {
      opacity: 1;
      padding: 10px;
    }

    .infos > span {
      display: block;
      padding: 5px;
      font-size: 0.7vw;
    }

    article:hover {
      background-color: rgb(252, 252, 252);
    }

    .grised {
        background-color: rgb(105, 105, 105);
    }
</style>