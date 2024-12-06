<script setup lang="ts">
    // Récupération et définition des variables utiles pour disable les buttons
    const currentImage = new URL('@/assets/chen-akinator.png', import.meta.url).href;
</script>

<template>
    <div id="wrapper">
        <img :src="currentImage" alt="spriteImage"/>
        <div>
            <div id="question">
                <p><slot></slot></p>
            </div>
            <div id="buttons">
                <button @click="$emit('oui')">Oui</button>
                <button @click="$emit('non')">Non</button>
            </div>
            <button id="replayButton" @click="$emit('replay')">
                <svg xmlns="http://www.w3.org/2000/svg" width="3vw" height="3vw" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
    #question {
        width: 20vw;
    }

    #question > p {
      font-size: 1vw;
    }

    img {
        width: 20vw;
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
        justify-content: space-evenly;
        width: 10vw;
    }

    #buttons > button {
      font-size: 1vw;
      width: 4vw;
    }

    #replayButton {
        position: absolute;
        right: 50px;
        bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 1000px) {
        img {
            width: 30vw;
        }

        #question > p {
            font-size: small;
        }

        #buttons{
            width: 20vw;
        }

        #buttons > button {
            font-size: small;
            width: 50px;
        }
    }
</style>