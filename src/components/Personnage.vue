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
            <p>
                La question
            </p>
            <ul>
                <li>Une réponse</li>
                <li>Une 2e réponse</li>
                <li>Une 3e réponse</li>
            </ul>
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
    
</style>