export async function getPokemon(nameOrIndex: string | number){
    // connection avec l'api pokémon avec la méthode Fetch (ne pas oublier le asynchrone)
    const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrIndex}`);

    // conversion de notre réponse à la requette en 1 objet json
    const data = await reponse.json();
    console.log(data)

    const pokemon = await convertData(data);
    console.log(pokemon);
    return pokemon;
}
//pour chaque pokemon transformer donnée API en donnée que ilan a besoin
// pour ça : fonction qui prend en paramètre l'id ou nom du pokemon et chope toute les données
// transformer l'apelle à l'api pour chaque pokemon formater les données utile en 1 objet json qui est enregistré dans un fichier pour être utiliser après dans d'autres requettes

async function convertData(data:any) {
    // requette de préparation pour aller chercher les infos dans species avec l'url donné
    const  reqSpecies = await fetch (data.species.url);
    const Species = await reqSpecies.json();

    // requette de la chaine d'évolution du pokemon
    const  reqEvolution = await fetch (Species.evolution_chain.url);
    const evolution = await reqEvolution.json();
        
    // Selection dans l'objet json des données que nous avons besoin
    const pokemon = {

        // renvoie un nombre
        pokedex : data.id,
        poids : data.weight,
        taille : data.height,

        // renvoie une chaine de caractère
        nom: data.name,
        type : data.types.map(typeObj => typeObj.type.name).join(', '), // type est un tableau donc on utilise la fonction map pour cherhcer dedans
        couleur : Species.color.name,
        habitat : Species.habitat.name,
        forme : Species.shape.name,
        evenement: evolution.chain.evolves_to
            .flatMap(evolution => evolution.evolution_details
                    .map(detail => detail.trigger.name)).join(', '),
        bebe : Species.is_baby,
        legendaire : Species.is_legendary,
        mythique : Species.is_mythical,

        //renvoie un lien
        image : data.sprites.front_default,

       // evolution : evolution.chain.evolution_details,
    }
    return pokemon;
}