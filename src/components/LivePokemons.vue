<script setup lang="ts">
import type {Pokemon} from "@/librairies/api";

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
</script>

<template>
  <div id="pokemons">
    <h2>Les pokemons auxquels je pense...</h2>
    <div>
        <article v-for="pok in trierGrised()" :class="{grised:(isGrised(pok))}">
            <img :src="pok.image" alt="pik"/>
            <span>{{ pok.nom }}</span>
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
        height: 200px;
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

    article {
        display: flex;
        align-items: center;
        background-color: rgb(230, 230, 230);
        border-bottom: solid 1px;
    }

    .grised {
        background-color: rgb(105, 105, 105);
    }

    article:hover {
        background-color: rgb(252, 252, 252);
        transition: all 200ms ease-out;
    }

    #pokemons > div::-webkit-scrollbar {
      display: none;
    }

</style>