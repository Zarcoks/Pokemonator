const lienAPI = 'https://pokeapi.co/api/v2/pokemon?limit=151=0';

console.log(lienAPI);

export async function getPokemon(nameOrIndex: string | number){
    // connection avec l'api pokémon avec la méthode Fetch (ne pas oublier le asynchrone)
    const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrIndex}`);

    // conversion de notre réponse à la requette en 1 objet json
    const data = await reponse.json();
    console.log(data)

    // Selection dans l'objet json des données que nous avons besoin
    const pokemon = {
        pokedex : data.id,
        name: data.name,
        type : data.types.map(typeObj => typeObj.type.name).join(', '),
        //evolution : data.evolution,
        poids : data.weight,
        taille : data.height,
        couleur : data.species.color,
    }
    console.log(pokemon);
}
//pour chaque pokemon transformer donnée API en donnée que ilan a besoin
// pour ça : fonction qui prend en paramètre l'id ou nom du pokemon et chope toute les données
// transformer l'apelle à l'api pour chaque pokemon formater les données utile en 1 objet json qui est enregistré dans un fichier pour être utiliser après dans d'autres requettes
