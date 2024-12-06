<script setup lang="ts">
    
</script>

<template>
    <header>
        <a href="/">
            POKEMONATOR
        </a>
    </header>
</template>

<style scoped>
    @import url('https://fonts.cdnfonts.com/css/pokemon-solid');
    header {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.8);
        height: 10vh;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        color: white;
        font-family: 'Pokemon Solid', sans-serif;
        font-size: 2vw;
    }

    @media screen and (max-width: 1000px) {
        header {
            height: 150px;
        }

        a {
            font-size: xx-large;
        }
    }
</style>