import categorie from "@/json/dataQuestions.json"
import type { Pokemon } from "./api";
import { attributQuestCorrespondPokemon } from "./dataManagement";

interface Categorie {
    categorie: string,
    q: string,
    p: number,
    attr: string[]
}

export interface CategorieAttribut {
    categorie: Categorie,
    attribut: string,
    question: string | null
}

/**
 * retourne un objet avec en "categorie" la catégorie de la question à poser et en
 * "attribut" l'attribut de la catégorie de la question à poser.
 */

function count<T>(array: T[], value: T): number {
    return array.filter((item) => item === value).length;
  }

function getCategorieAndAttributeForQuestion(possiblePokeList:Pokemon[]) {
    let i = 0;
    let meilleureSolution = {
        categorie: { categorie: "", q: "", p: 0, attr: [] },
        attribut: "",
        score: 200,
        question: "",
    }
    categorie.categories.forEach(cat => {
        cat.attr.forEach(att => {
            i = 0
            possiblePokeList.forEach(pokemon => {
                let obj = {
                    categorie: cat,
                    attribut: att,
                    question: null
                }
                if (attributQuestCorrespondPokemon(obj , pokemon)) i++;
            })
            // Le nombre de pok vaut i :
            let sc = calculateScore(possiblePokeList, i)
            if (sc < meilleureSolution.score) {
                meilleureSolution.score = sc
                meilleureSolution.categorie.categorie = cat.categorie
                meilleureSolution.attribut = att
                meilleureSolution.categorie.q = cat.q
            }

        });  
    });

    // TODO: améliorer l'algo
    return meilleureSolution
}

function calculateScore(listePokemon:Pokemon[], number:number){
    let nb = Math.round(listePokemon.length/2);
    let score = number-nb;
    score=Math.abs(score)
    return score;
    console.log(score);
}

/**
 * 
 * @param attribut Prend en paramètre un objet avec "categorie" et "attribut" et retourne une chaine
 * avec une question compréhensible
 */
function buildQuestion(categorieAttributQuestion:CategorieAttribut) {
    categorieAttributQuestion.question = categorieAttributQuestion.categorie.q + " " + categorieAttributQuestion.attribut + " ?"
    console.log(categorieAttributQuestion.categorie.q)
}

/**
 * Retourne un string qui contient la question à poser.
 * @param possiblePokeList 
 */
export function getNextQuestion(possiblePokeList:Pokemon[]) {
    let attributs = getCategorieAndAttributeForQuestion(possiblePokeList)
    console.log(attributs)
    buildQuestion(attributs)
    return attributs
}

function exclusPokemon(p: Pokemon, pokeList1: Pokemon[], pokeList2: Pokemon[]) {
    pokeList2.push(p);
    const index = pokeList1.findIndex((pok: Pokemon) => pok.nom === p.nom);
    if (index !== -1) {
        pokeList1.splice(index, 1); // Supprime l'élément directement de la liste
    }
}

export function updateData(answer: string, question:CategorieAttribut, possiblePokemon:Pokemon[], impossiblePokemon:Pokemon[]) {
    if (answer === "oui") {
        //console.log(attributQuestCorrespondPokemon(question, possiblePokemon[0]))
        // For chaque pokemon, ça check si ça correspond, si ça correspond, le garde, sinon le jerte
        possiblePokemon.forEach((pok:Pokemon) => {
            if (!attributQuestCorrespondPokemon(question, pok)) {
                exclusPokemon(pok, possiblePokemon, impossiblePokemon)
            }
        })
    } else if (answer === "non") {
        //console.log(!attributQuestCorrespondPokemon(question, possiblePokemon[0]))
        possiblePokemon.forEach((pok:Pokemon) => {
            if (attributQuestCorrespondPokemon(question, pok)) {
                exclusPokemon(pok, possiblePokemon, impossiblePokemon)
            }
        })
    } else {
        // Encore autre chose
    }
}

export function ask_or_guess(listePokemon:Pokemon[]){
    if (listePokemon.length ===1){
        return "guess";
        console.log("je pense à" + listePokemon.values)
    }
    else if (listePokemon.length < 1){
        return "error"
        console.log("Je n'ai pas reussi à trouver ton pokémon");
    }
    else{
        return "ask"
        //getNextQuestion(listePokemon);
    }
}

function guessPokemon(listePokemon:Pokemon[]){
    return listePokemon[0]
}
