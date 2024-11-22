<script setup lang="ts">
import Perso from "@/components/perso.vue";
import {getPokemon} from "@/librairies/api";
getPokemon(2)
</script>

<template>
<perso></perso>
</template>

<style scoped>

</style>