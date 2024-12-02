<script setup lang="ts">
const props = defineProps<{callback: Function, src: string, message: string}>();
</script>

<template>
    <div id="container">
      <img :src="props.src" alt="">
      <div>
        <h3>{{ props.message }}</h3>
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

 #container {
    width: 80vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
 }
</style>