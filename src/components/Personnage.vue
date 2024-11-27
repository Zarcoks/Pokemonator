<script setup lang="ts">
import {buildquest} from "@/librairies/poserquestion"
import jsonData from "@/json/tsconfig.json"
    // Récupération et définition des variables utiles pour disable les buttons
    const props = defineProps<{disable: boolean}>();
    const currentImage = new URL('@/assets/chen-akinator.png', import.meta.url).href;
    buildquest("Type", "test");
</script>

<template>
    <div id="wrapper">
        <img :src="currentImage" alt="spriteImage"/>
        <div>
            <div id="question">
                <p><slot></slot></p>
            </div>
            <div id="buttons">
                <button :disabled="props.disable">Oui</button>
                <button :disabled="props.disable">Non</button>
                <button :disabled="props.disable">Je ne sais pas</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    img {
        max-width: 300px;
        margin: 10px
    }

    #wrapper {
        display: flex;
        align-items: center;
        height: 100%;
        margin-right: 10%;
    }

    #wrapper > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    #buttons{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 150px;
    }    
</style>