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
    buildquest()
}