import jsonData from "@/json/tsconfig.json"


export function ask_or_guest(){
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