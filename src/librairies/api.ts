// object pokemon
interface Pokemon {
    pokedex: number; // Le numéro dans le Pokédex
    poids: number; // Poids en hectogrammes
    taille: number; // Taille en décimètres
    nivEvolution: number; // Niveau d'évolution (1, 2 ou 3)
    nom: string; // Nom du Pokémon
    type: string; // Types du Pokémon, séparés par des virgules
    couleur: string; // Couleur principale
    habitat: string; // Habitat naturel
    forme: string; // Forme physique
    evenement: string | null; // Condition d'évolution
    bebe: boolean; // Indique si c'est un bébé Pokémon
    legendaire: boolean; // Indique si c'est un Pokémon légendaire
    mythique: boolean; // Indique si c'est un Pokémon mythique
    objetEvoltution: string | null; // Objet nécessaire pour évoluer
    image: string; // URL de l'image
}
//  fonction pour récupérer l'ordre de la chaîne d"évolution
function getEvolutionNumber(chain, nomPokemon){
    // pokemon de base
    if (chain.species.name === nomPokemon){
        return 1;
    }
    //1ere évolution
    if (chain.evolves_to.flatMap(evo => evo.species.name).includes(nomPokemon)){
        return 2;
    }
    //2ème évolution
    if (chain.evolves_to.flatMap(evo => evo.evolves_to
        .flatMap(evo2 => evo2.species.name)).includes(nomPokemon)){
        return 3;
    }
}

//fonction pour récupérer les conditions d'évolution d'un pokemon
function getEvolutionTrigger(chain, numEvolution){
    // 1ere evolution
    if(numEvolution === 2){
        return chain.evolves_to
            .flatMap(evolution => evolution.evolution_details
                .map(detail => detail.trigger.name))[0];
    }
    //2ere évolution
    if(numEvolution === 3){
        return chain.evolves_to
            .flatMap(evolution => evolution.evolves_to
                .flatMap(evo => evo.evolution_details
                    .map(detail => detail.trigger.name)))[0];
    }
}

function getEvolutionItem(chain, numEvolution){
    //1ere évolution
    if(numEvolution === 2 ){
        const item = chain.evolves_to
            .flatMap(evolution => evolution.evolution_details
                .map(detail => detail.item?.name))[0]  // ? = si item est null empèche de faire une erreure
        return item || null;
    }
    //2ere évolution
    if(numEvolution === 3){
        const item = chain.evolves_to
            .flatMap(evolution => evolution.evolves_to
                .flatMap(evo => evo.evolution_details
                    .map(detail => detail.item?.name)))[0]
        return item || null;
    }
    return null;
}

// création d'un pokemon avec les infos utiles pour les questions grâce à une API
export async function getPokemon(nameOrIndex: string | number){
    // connection avec l'api pokémon avec la méthode Fetch (ne pas oublier le asynchrone)
    const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrIndex}`);

    // conversion de notre réponse à la requette en 1 objet json
    const data = await reponse.json();
    //console.log(data)

    // requette de préparation pour aller chercher les infos dans species avec l'url donné
    const  reqSpecies = await fetch (data.species.url);
    const Species = await reqSpecies.json();

    // requette de la chaine d'évolution du pokemon
    const  reqEvolution = await fetch (Species.evolution_chain.url);
    const evolution = await reqEvolution.json();

    // appelle des fonctions ci dessus
    const nivEvolution = getEvolutionNumber(evolution.chain,data.name);
    const evenement = getEvolutionTrigger(evolution.chain,nivEvolution);
    const objetEvolution = getEvolutionItem(evolution.chain,nivEvolution);

    // création en json du pokemon avec les données trié pour les questions
    const pokemon: Pokemon = {

        pokedex : data.id,
        poids : data.weight,
        taille : data.height,
        nivEvolution : nivEvolution,
        nom: data.name,
        type : data.types.map(typeObj => typeObj.type.name).join(', '), // type est un tableau donc on utilise la fonction map pour cherhcer dedans
        couleur : Species.color.name,
        habitat : Species.habitat.name,
        forme : Species.shape.name,
        evenement: evenement,
        bebe : Species.is_baby,
        legendaire : Species.is_legendary,
        mythique : Species.is_mythical,
        objetEvoltution : objetEvolution,
        image : data.sprites.front_default,
    }
        //console.log(pokemon);
    return pokemon;
}