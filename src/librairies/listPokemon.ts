import {getPokemon} from "@/librairies/api";
/*import { join } from 'path';
import {writeFileSync, existsSync} from 'fs';


export function saveListToFile(fileName: string, list: any[]): void {
    try {
        // Construire le chemin du fichier
        const filePath = join(__dirname, fileName);

        // Vérifier si le fichier existe déjà
        if (existsSync(filePath)) {
            console.log(`Le fichier "${fileName}" existe déjà.`);
            return;
        }

        // Convertir la liste en JSON formaté
        const jsonData = JSON.stringify(list, null, 4);

        // Écrire les données dans le fichier
        writeFileSync(filePath, jsonData, 'utf-8');

        console.log(`La liste a été sauvegardée avec succès dans "${fileName}".`);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de la liste :', error);
    }
    }
*/

// fait la liste des 151 premier pokemon
export async function listPokemon() {
    const listPokemon = [];
    for (let i = 1; i <= 151; i++) {
        const pokemon = await getPokemon(i);
        listPokemon.push(pokemon);
    }

    console.log('liste des pokemon', listPokemon);
    return listPokemon;
}
