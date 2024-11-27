interface innerConfig {
    q: string,
    p: number
}

interface TsConfig {
    Type: innerConfig,
    Evolution: innerConfig,
    Poids: innerConfig,
    Taille: innerConfig,
    Couleur: innerConfig,
    Rarete: innerConfig,
    Lieu: innerConfig,
    Espece: innerConfig,
    TypeEvolution: innerConfig,
}

export function ask_or_guest(tsconfig:TsConfig){
    let possiblePokemon = pokemonData;
    if (possiblePokemon.lenght ===1){
        consol.log(`Je pense a : ${possiblePokemon.lenght}`);
    }
    else if (possiblePokemon.lenght < 1){
        consol.log("Je n'ai pas reussi à trouver ton pokémon");
    }

    else{
        choosequest();
    }
}

export function buildquest(tsconfig:TsConfig, attribut:string, variable:string){
    const question = tsconfig[attribut].q + variable + "?"
    return question;
}

export function choosequest(){
    buildquest()
}