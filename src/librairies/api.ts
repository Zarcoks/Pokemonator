// object pokemon
export interface Pokemon {
    pokedex: number; // Le numéro dans le Pokédex
    poids: number; // Poids en hectogrammes
    taille: number; // Taille en décimètres
    nivEvolution: number; // Niveau d'évolution (1, 2 ou 3)
    nom: string; // Nom du Pokémon en français
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
    nivEvolutionMin : number | null; // niveau minimal pour être évoluer
}
//  fonction pour récupérer l'ordre de la chaîne d"évolution
function getEvolutionNumber(chain: any, nomPokemon: string): number{
    // pokemon de base
    if (chain.species.name === nomPokemon){
        return 1;
    }
    //1ere évolution
    else if (chain.evolves_to.flatMap((evo:any) => evo.species.name).includes(nomPokemon)){
        return 2;
    }
    //2ème évolution
    return 3;
}

//fonction pour récupérer les conditions d'évolution d'un pokemon
function getEvolutionTrigger(chain: any, numEvolution : number): string | null {
    // 1ere evolution

    if(numEvolution === 2){
         const trigger = chain.evolves_to
            .flatMap((evolution:any) => evolution.evolution_details
                .map((detail:any) => detail.trigger.url))[0];
         return trigger;
    }
    //2ere évolution
    else if(numEvolution === 3){
        const trigger = chain.evolves_to
            .flatMap((evolution: any) => evolution.evolves_to
                .flatMap((evo: any) => evo.evolution_details
                    .map((detail: any) => detail.trigger.url)))[0];
        console.log(trigger);
        return trigger;

    }
    return null;
}

// retourne l'objet utiliser pour évoluer ou null si il y en a pas
function getEvolutionItem(chain:any, numEvolution : number) : string | null{
    //1ere évolution
    if(numEvolution === 2 ){
        const item : string = chain.evolves_to
            .flatMap((evolution:any) => evolution.evolution_details
                .map((detail:any) => detail.item?.name))[0]  // ? = si item est null empèche de faire une erreure
        return item || null;
    }
    //2ere évolution
    if(numEvolution === 3){
        const item : string = chain.evolves_to
            .flatMap((evolution:any) => evolution.evolves_to
                .flatMap((evo:any) => evo.evolution_details
                    .map((detail:any) => detail.item?.name)))[0]
        return item || null;
    }
    return null;
}

// récupère le niveau minimal pour l'évolution
function getEvolutionlevelMin(chain:any, numEvolution : number) : number | null{
    //1ere évolution
    if(numEvolution === 2 ){
        const level = chain.evolves_to
            .flatMap((evolution:any) => evolution.evolution_details
                .map((detail:any) => detail.min_level))[0]
        return level || null;
    }
    //2ere évolution
    if(numEvolution === 3){
        const level = chain.evolves_to
            .flatMap((evolution:any) => evolution.evolves_to
                .flatMap((evo:any) => evo.evolution_details
                    .map((detail:any) => detail.min_level)))[0]
        return level || null;
    }
    return null;
}

// création d'un pokemon avec les infos utiles pour les questions grâce à une API
export async function getPokemon(nameOrIndex: string | number) :Promise<Pokemon>{
    // connection avec l'api pokémon avec la méthode Fetch (ne pas oublier le asynchrone)
    const reponse : Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrIndex}`);

    // conversion de notre réponse à la requette en 1 objet json
    const data = await reponse.json();
    //console.log(data)

    // requette de préparation pour aller chercher les infos dans species avec l'url donné
    const  reqSpecies: Response = await fetch (data.species.url);
    const Species = await reqSpecies.json();

    // requette de la chaine d'évolution du pokemon
    const  reqEvolution :Response = await fetch (Species.evolution_chain.url);
    const evolution = await reqEvolution.json();

    const reqColorFr: Response = await fetch (Species.color.url)
    const colorFr= await reqColorFr.json();

    const reqFormeFr : Response = await fetch (Species.shape.url);
    const formeFr = await reqFormeFr.json();

    const reqHabitatFr : Response = await fetch (Species.habitat.url);
    const habitatFr = await reqHabitatFr.json();

    /*const reqTypeFr : response = await fetch (data.types.map((typeObj:any) => typeObj.type.name));
    const typeFr = await reqTypeFr.json();*/

    // appelle des fonctions ci dessus
    const nivEvolution : number = getEvolutionNumber(evolution.chain,data.name);
    const evenement : string | null = getEvolutionTrigger(evolution.chain,nivEvolution);
    const objetEvolution : string | null = getEvolutionItem(evolution.chain,nivEvolution);
    const nivEvolutionMin: number | null = getEvolutionlevelMin(evolution.chain,nivEvolution);

    let evenementFr = null;
    if (evenement !== null) {
        const reqEvenementFr : Response = await fetch (evenement);
        evenementFr = await reqEvenementFr.json();
    }
    
    // création en json du pokemon avec les données trié pour les questions

    // Récupérer les noms des types en français
    const typeFrList: (Awaited<any>)  = await Promise.all(
        data.types.map(async (typeObj: any) => {
            // Effectuer une requête pour chaque type
            const reqTypeFr: Response = await fetch(`https://pokeapi.co/api/v2/type/${typeObj.type.name}`);
            const typeDataFr = await reqTypeFr.json();
            // Trouver le nom en français
            return typeDataFr.names.find((name: { name: string; language: { name: string } }) =>
                name.language.name === "fr"
            )?.name;
        })
    );
    // Combiner les types en une seule chaîne
    const typeFr : string = typeFrList.filter(Boolean).join(', ');


    const pokemon: Pokemon = {

        pokedex : data.id,
        poids : data.weight,
        taille : data.height,
        nivEvolution : nivEvolution,
        nom: Species.names.find((name: { name: string; language: { name: string } }) =>
            name.language.name === "fr"
        )?.name,
        type : typeFr,
        couleur : colorFr.names.find((name: {name : string; language: { name: string } }) =>
            name.language.name === "fr"
        )?.name,
        habitat : habitatFr.names.find((name : {name : string; language : {name : string}} ) =>
            name.language.name=== "fr"
        )?.name,
        forme : formeFr.names.find((name: { name : string; language: { name: string } }) =>
            name.language.name === "fr"
        )?.name,
        evenement: evenementFr === null ? "" : evenementFr.names.find((name : {name : string; language : {name : string}}) =>
            name.language.name === "fr"
        )?.name,
        bebe : Species.is_baby,
        legendaire : Species.is_legendary,
        mythique : Species.is_mythical,
        objetEvoltution : objetEvolution,
        image : data.sprites.front_default,
        nivEvolutionMin : nivEvolutionMin,
    }
        console.log(pokemon);
    return pokemon;
}