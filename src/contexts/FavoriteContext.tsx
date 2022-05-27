import { createContext } from "react";
import { FavoritoDTO } from "../dtos/FavoritoDTO";
import { PokemonDTO } from "../dtos/PokemonDTO";

interface IFavoriteContext {  
    favoritos: FavoritoDTO[];
    listarFavoritosStorage(): Promise<void>;
    addFavoritos(pokemon: PokemonDTO): Promise<void>;   
    removerStorage(id: number): Promise<void>
    validarFavorito(id: number): boolean
}

export const FavoriteContext = createContext({} as IFavoriteContext);