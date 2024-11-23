<script setup lang="ts">
    let data = [
        {
            name: "pikachu",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        },
        {
            name: "aegislash",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        },
        {
            name: "raichu",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png"
        }
    ]
    let grisedPokemons = [
        "raichu",
        "pikachu"
    ]

    function isGrised(pokemon:any) {
        console.log(grisedPokemons.indexOf(pokemon.name));
        return grisedPokemons.indexOf(pokemon.name) >= 0;
    }

    function trierGrised() {
        return data.filter((pok) => !isGrised(pok)).concat(data.filter((pok) => isGrised(pok)));
    }
</script>

<template>
    <div>
        <article v-for="pok in trierGrised()" :class="{grised:(isGrised(pok))}">
            <img :src="pok.img" alt="pik"/>
            <span>{{ pok.name }}</span>
        </article>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        overflow: scroll;
        width: 300px;
        height: 200px;
        background-color: lightgray;
        border-radius: 20px;
        border: solid 1px;
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
</style>