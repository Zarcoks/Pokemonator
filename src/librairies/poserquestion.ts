

function ask_or_guest(){
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

function buildquest(attribut, variable){
    attribut = type;

}

function choosequest(){
    ForEach(buildquest) => {

    }

}