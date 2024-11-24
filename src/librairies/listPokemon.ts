import {getPokemon} from "@/librairies/api";

// fait la liste des 151 premier pokemon
export async function listPokemon(){
    const listPokemon = [];
    for (let i=1; i <= 151; i++){
        const pokemon = await getPokemon(i);
        listPokemon.push(pokemon);
    }

    console.log('liste des pokemon', listPokemon);
}