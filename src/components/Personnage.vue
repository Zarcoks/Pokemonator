<script setup lang="ts">
    import { ref } from 'vue';
    const sprites = [
        new URL('@/assets/sprites/welcome.png', import.meta.url).href,
        new URL('@/assets/sprites/found.png', import.meta.url).href,
        new URL('@/assets/sprites/brain.png', import.meta.url).href,
        new URL('@/assets/sprites/okay.png', import.meta.url).href
    ];
    let currentImage = ref(sprites[0])    
</script>

<template>
    <div id="wrapper">
        <img :src="currentImage" alt="spriteImage"/>
        <div>
            <div id="question">
                <p>
                    La question qui est un peu plus longue que celle prévue
                </p>
            </div>
            <div id="buttons">
                <button>Oui</button>
                <button>Non</button>
                <button>Je ne sais pas</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    img {
        width: 40%;
        background-color: dark;
        width: 200px;
        height: 500px;
    }

    #wrapper {
        display: flex;
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