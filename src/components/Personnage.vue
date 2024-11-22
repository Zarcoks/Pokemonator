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
        </div>
    </div>
</template>

<style scoped>
    img {
        width: 40%;
    }

    #wrapper {
        display: flex;
    }

    #wrapper > div {
        background-color: azure;
    }
</style>