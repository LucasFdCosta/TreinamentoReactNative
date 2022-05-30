import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { FavoritoDTO } from "../dtos/FavoritoDTO";
import { PokemonDTO } from "../dtos/PokemonDTO";
import { useAuth } from "./auth";

interface FavoriteProviderProps {
    children: ReactNode;
}

const FAVORITOS_KEY = "@TreinamentoReactNative:favoritos";

function FavoriteProvider({children}: FavoriteProviderProps) {
    const [favoritos, setFavoritos] = useState<FavoritoDTO[]>([]);
    const {usuario} = useAuth();

    
    async function listarFavoritosStorage() {
        const favoritosStorage = await AsyncStorage.getItem(FAVORITOS_KEY);
        if (favoritosStorage) {
            const favoritosParse = JSON.parse(favoritosStorage) as FavoritoDTO[];
            setFavoritos(favoritosParse);
        }
    }
    
    useEffect(() => {
        listarFavoritosStorage();
    }, []);

    function validarFavorito(id: number) {
        return favoritos.some(fav => fav.pokemon.id === id);
        // favoritos.forEach(favorito => {
        //     if (favorito.pokemon.id == id) {
        //         return true;
        //     }
        // });
        // return false;
    }

    async function addFavoritos(pokemon: PokemonDTO) {
        const favoritosStorage = await AsyncStorage.getItem(FAVORITOS_KEY);

        const favoritosParse = favoritosStorage ? JSON.parse(favoritosStorage) as FavoritoDTO[] : [];
        if (favoritosParse) {
            var favoritado = await validarFavorito(pokemon.id);

            if (!favoritado) {
                favoritosParse.push({
                    id: Math.random(),
                    pokemon,
                    usuario: usuario!
                });
            } else {
                console.log("Esse pokemon já está na lista de favoritos");
                removerStorage(pokemon.id);
              
            }
        }
        await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritosParse))
    }

    async function removerStorage(id: number) {
        const favoritos = await AsyncStorage.getItem(FAVORITOS_KEY);        
        if(favoritos){
            const favoritosParse = JSON.parse(favoritos) as FavoritoDTO[];
            const filtrados = favoritosParse.filter(f => f.pokemon.id !== id);
            await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(filtrados));
            console.log("removido");
            listarFavoritosStorage();
        }
    }

    return (
        <FavoriteContext.Provider value={{
            favoritos,
            listarFavoritosStorage,
            removerStorage,
            addFavoritos,
            validarFavorito
        }}>
            { children }
        </FavoriteContext.Provider>
    ) 
}

function useFavorite()
{
    const context = useContext(FavoriteContext);

    return context;
}

export { FavoriteProvider, useFavorite }