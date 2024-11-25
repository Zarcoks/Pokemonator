import {getPokemon} from "@/librairies/api";
//import { join } from 'path';
//import { writeFileSync, existsSync } from 'fs';

// fait la liste des 151 premier pokemon
/*export async function listPokemon(): Promise<void> {
   const filePath = join(__dirname, 'listPokemon.json'); // Chemin du fichier

    // Vérifie si le fichier existe déjà
    if (existsSync(filePath)) {
        const fileStats = statSync(filePath);
        if (fileStats.size > 0) {
            console.log('Le fichier existe déjà et n\'est pas vide. Aucun nouveau fichier créé.');
            return;
        }

   }*/
export async function listPokemon(){
    const listPokemon = [];
    for (let i = 1; i <= 151; i++) {
        const pokemon = await getPokemon(i);
        listPokemon.push(pokemon);
    }

    console.log('liste des pokemon', listPokemon);
    return listPokemon;

// Sauvegarde de la liste dans un fichier JSON
    /*writeFileSync(filePath, JSON.stringify(listPokemon, null, 4), 'utf-8');
    console.log(`La liste des Pokémon a été sauvegardée dans ${filePath}`);
*/}