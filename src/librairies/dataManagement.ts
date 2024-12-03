import type { Pokemon } from "./api"
import type { CategorieAttribut } from "./poserquestion"
import equivalences from "@/json/equivalences.json"

function getCategorieEquivalente(categorie: keyof typeof equivalences.Categories) {
    return equivalences.Categories[categorie];
}

function getAttributEquivalent(attribut: keyof typeof equivalences.Attributes){
    return equivalences.Attributes[attribut];
}

function rareteEquivalente(pokemon: Pokemon, rareteQuestion:string) {
    if (rareteQuestion === "commun") return !pokemon.legendaire && !pokemon.mythique
    else if (rareteQuestion === "légendaire") return pokemon.legendaire;
    else return pokemon.mythique
}

function typeEvolutionEquivalent(pokemon: Pokemon, typeEvolutionQuestion: string) {
    if (typeEvolutionQuestion === "de montée de niveau") return pokemon.evenement === "level-up"
    else if (typeEvolutionQuestion === "d'être échangé") return pokemon.evenement === "trade"
    else return pokemon.objetEvoltution !== null;
}

function equivalentPoids(pokemon:Pokemon, poids: string) {
    if (poids === "lourd (plus de 30 kg)") return pokemon.poids/10 > 30;
    else if (poids === "de poids moyen (entre 10 et 30 kg)") return pokemon.poids/10 >= 10 && pokemon.poids/10 <= 30;
    else return pokemon.poids < 10;
}

function equivalentTaille(pokemon: Pokemon, taille: string) {    
    if (taille === "grand (plus de 150 cm)") {
        return pokemon.taille > 15;
    }
    else if (taille === "de taille moyenne (entre 50 et 150 cm)") {
        return pokemon.taille >= 5 && pokemon.taille <= 15;
    }
    else return pokemon.taille < 5;
}

/**
 * Renvoie vrai si la catégorie ET l'attribut dans cat est similaire à Pokemon
 * @param cat 
 * @param pokemon 
 */
export function attributQuestCorrespondPokemon(cat: CategorieAttribut, pokemon: Pokemon) {
    const sensibleCategories = ["Taille", "Poids", "Rarete", "TypeEvolution"]
    // Pour chaque catégorie de question, pour chaque attribut, s'il y en a un qui fit, c'est correct
    // Une partie classique et une partie sensible
    // Partie data classique (ni l'attribut ni la catégorie):
    if (!(sensibleCategories.includes(cat.categorie.categorie))) {
        let attributPokemon:string = pokemon[getCategorieEquivalente(cat.categorie.categorie)].toString() // l'erreur c'est le type car il est pas sur que ton string soit une clé du tab
        let attributQuestion = getAttributEquivalent(cat.attribut) // idem

       /*
        console.log("attribut pokemon:");
        console.log(attributPokemon);
        console.log("attribut raw:");
        console.log(cat.attribut);
        console.log("attribut jugé équivalent:");
        console.log(attributQuestion);
        console.log("----------------------");
        */


        let tab = attributPokemon.split(', ')
        
        if (tab.length > 1) {
            // Cas où les pokemons ont plusieurs valeurs dans la catégorie (ex: type = [grass, poison])
            return tab.includes(attributQuestion)
        }
        // Cas où l'attribut pokemon n'est pas un tableau
        return tab[0] == attributQuestion
    }
    // Partie data sensible:
    else {
        if (cat.categorie.categorie === "Rarete") {
            return rareteEquivalente(pokemon, cat.attribut)
        }
        else if (cat.categorie.categorie === "TypeEvolution") {
            return typeEvolutionEquivalent(pokemon, cat.attribut)
        }
        else if (cat.categorie.categorie === "Poids") {
            return equivalentPoids(pokemon, cat.attribut)
        } 
        else if (cat.categorie.categorie === "Taille") {
            return equivalentTaille(pokemon, cat.attribut)
        }
    }
}
/*
function arePokemonAllTheSame(pokemon1: Pokemon, pokemon2: Pokemon) {
    if (pokemon1.bebe !== pokemon2.bebe) return false;
    if (pokemon1.couleur !== pokemon2.couleur) return false;
    if (pokemon1.evenement !== pokemon2.evenement) return false;
    if (pokemon1.forme !== pokemon2.forme) return false;
    if (pokemon1.habitat !== pokemon2.forme) return false;
    if (pokemon1.legendaire !== pokemon2.legendaire) return false;
    if (pokemon1.mythique !== pokemon2.mythique) return false;
    if (pokemon1.nivEvolution !== pokemon2.nivEvolution) return false;
    if (pokemon1.nivEvolutionMin !== pokemon2.nivEvolutionMin) return false;
    if (pokemon1.objetEvoltution !== pokemon2.objetEvoltution) return false;
    if ()
}
    */