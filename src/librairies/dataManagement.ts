import type { Pokemon } from "./api"
import type { CategorieAttribut } from "./poserquestion"

function exclusPokemon(p: Pokemon, pokeList1: Pokemon[], pokeList2: Pokemon[]) {
    pokeList2.push(p)
    pokeList1 = pokeList1.filter((pok:Pokemon) => pok.nom !== p.nom)
}

function isEquivalentTo(cat: CategorieAttribut, pokemon: Pokemon) {
    
}