<script setup lang="ts">
const props = defineProps<{callback: Function, won: boolean}>();
let src = props.won ? new URL('@/assets/chen-akinator.png', import.meta.url).href : ""
</script>

<template>
    <div id="container">
      <img :src="src" alt="">
      <div>
        <h1>Merci d'avoir joué !</h1>
        <h3>Veux-tu rejouer ?</h3>
        <button @click="callback()">Rejouer !</button>
      </div>
    </div>
</template>

<style scoped>
 img {
    height: 80vh;
 }

 h1 {
    text-align: center;
 }

 #container {
    width: 80vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
 }
</style>