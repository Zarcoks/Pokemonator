<script setup lang="ts">
import type {Pokemon} from "@/librairies/api";
import { computed } from "vue";

  // Récupération et définition des variables utiles au fonctionnement du composant
  const props = defineProps<{pokemons: Pokemon[], grised: Pokemon[]}>();

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

</script>

<template>
  <div id="pokemons">
    <h2>Les pokemons auxquels je pense...</h2>
    <div>
        <article v-for="pok in pokemonFiltres" :class="{grised:(isGrised(pok))}">
          <div id="base">
            <img :src="pok.image" alt="pik"/>
            <span>{{ pok.nom }}</span>
          </div>
          <div id="infos">
            <span> numéro pokédex : {{ pok.pokedex }}</span>
            <span> type : {{pok.type}}</span>
            <span> phase chaine d'évolution : {{pok.nivEvolution}}</span>
            <span> poids : {{pok.poids}}</span>
            <span> taille : {{pok.taille}}</span>
            <span> couleur : {{pok.couleur}}</span>
            <span> bebe : {{pok.bebe}}</span>
            <span> legendaire : {{pok.legendaire}}</span>
            <span> mythique : {{pok.mythique}}</span>
            <span> habitat : {{pok.habitat}}</span>
            <span> forme : {{pok.forme}}</span>/
            <span> évènement : {{pok.evenement}}</span>
            <span> Objet pour évoluer : {{pok.objetEvoltution}}</span>
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

    #pokemons > div {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        width: 300px;
        height: 300px;
        background-color: lightgray;
        border-radius: 20px;
        border: solid 1px;
    }

    .aligneGif {
      align-items: center;
      justify-content: center;
    }

    img {
        width: 20%;
        margin: 5px;
    }

    article > #base {
        display: flex;
        align-items: center;
        border-bottom: solid 1px;
        overflow-y : hidden;
    }

    #infos {
      display: none;
    }

    #infos > span {
      display: block;
      align-items: center;

    }

    article:hover {
      background-color: rgb(252, 252, 252);
      transition: all 200ms ease-out;

    }

    article:hover > #base{
      border-bottom: none;
    }

    article:hover > #infos {
      display: block;
      opacity: 1;
      padding: 10px;
      border-bottom: solid 1px;
    }

    .grised {
        background-color: rgb(105, 105, 105);
    }

    #pokemons > div::-webkit-scrollbar {
      display: none;
    }

</style>