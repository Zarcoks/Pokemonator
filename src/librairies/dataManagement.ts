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
    if (typeEvolutionQuestion === "d'une montée de niveau") return pokemon.evenement === "level-up"
    else if (typeEvolutionQuestion === "d'un échange") return pokemon.evenement === "trade"
    else return pokemon.objetEvoltution !== null;
}

function equivalentPoids(pokemon:Pokemon, poids: string) {
    console.log(pokemon.poids/10>=30)
    if (poids === "lourd (plus de 30 kg)") return pokemon.poids/10 >= 30;
    else if (poids === "de poids moyen (entre 10 et 30 kg)") return pokemon.poids/10 >= 10;
    else return pokemon.poids < 10;
}

function equivalentTaille(pokemon: Pokemon, taille: string) {
    if (taille === "grand (cm)") return pokemon.taille >= 15;
    else if (taille === "de taille moyenne (cm)") return pokemon.taille >= 5;
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
        let attributPokemon = pokemon[getCategorieEquivalente(cat.categorie.categorie)] // l'erreur c'est le type car il est pas sur que ton string soit une clé du tab
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
        
        if (Array.isArray(attributPokemon)) {
            // Cas où les pokemons ont plusieurs valeurs dans la catégorie (ex: type = [grass, poison])
            return attributPokemon.includes(attributQuestion)
        }
        // Cas où l'attribut pokemon n'est pas un tableau
        return attributPokemon == attributQuestion
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