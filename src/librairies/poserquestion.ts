import categorie from "@/json/dataQuestions.json"
import type { Pokemon } from "./api";

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

function getCategorieAndAttributeForQuestion(possiblePokeList:Pokemon[]) {
    // TODO: améliorer l'algo
    let indexCat = Math.floor(Math.random() * categorie.categories.length);
    let cat = categorie.categories[indexCat]
    let att = categorie.categories[indexCat].attr[Math.floor(Math.random() * categorie.categories[indexCat].attr.length)]
    return {categorie: cat, attribut: att, question: null}
}

/**
 * 
 * @param attribut Prend en paramètre un objet avec "categorie" et "attribut" et retourne une chaine
 * avec une question compréhensible
 */
function buildQuestion(categorieAttributQuestion:CategorieAttribut) {
    categorieAttributQuestion.question = categorieAttributQuestion.categorie.q + categorieAttributQuestion.attribut + " ?"
}

/**
 * Retourne un string qui contient la question à poser.
 * @param possiblePokeList 
 */
export function getNextQuestion(possiblePokeList:Pokemon[]) {
    let attributs = getCategorieAndAttributeForQuestion(possiblePokeList)
    buildQuestion(attributs)
    return attributs
}

function exclusPokemon(p: Pokemon, pokeList1: Pokemon[], pokeList2: Pokemon[]) {
    pokeList2.push(p)
    pokeList1 = pokeList1.filter((pok:Pokemon) => pok.nom !== p.nom)
}

export function updateData(answer: string, question:CategorieAttribut, possiblePokemon:Pokemon[], impossiblePokemon:Pokemon[]) {
    if (answer === "oui") {
        // On fera un truc
    } else if (answer === "non") {
         // Autre chose
    } else {
        // Encore autre chose
    }
}

export function ask_or_guess(){
    /*
    let possiblePokemon = pokemonData;
    if (possiblePokemon.lenght ===1){
        console.log(`Je pense a : ${possiblePokemon.lenght}`);
    }
    else if (possiblePokemon.lenght < 1){
        console.log("Je n'ai pas reussi à trouver ton pokémon");
    }

    else{
        choosequest();
    }
     */
}
/*
export function buildquest(attribut:string, variable:string){
    const question = jsonData[attribut].q + variable + " ?"
    console.log(question)
    return question;
}

export function choosequest(){

    let questions = [];
    for (const categorie in jsonData)
        if (Object.prototype.hasOwnProperty.call(jsonData, categorie)) {
            const data = jsonData[categorie];
            const baseQuestion = data.q; // La question de base
            

            // Générer les questions avec les attributs (attr) s'ils existent
            if (data.attr && Array.isArray(data.attr)) {
                data.attr.forEach((valeur: string | number) => {
                    questions.push(`${baseQuestion}${valeur}`);
                });
            } else {
                // Si pas d'attributs, ajouter la question seule
                questions.push(baseQuestion);
            }
        }
    console.log(questions);
    return questions;
}

// Appeler la fonction pour générer toutes les questions
const allQuestions = choosequest();
allQuestions.forEach((question, index) => {
    console.log(`${index + 1}. ${question}`);
});
*/