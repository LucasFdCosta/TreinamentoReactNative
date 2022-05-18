import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import FavoriteCard from "../../components/FavoriteCard";
import { FavoritoDTO } from "../../dtos/FavoritoDTO";
import { PokemonDTO } from "../../dtos/PokemonDTO";
import {
    Container,
    Header,
    Titulo
} from './styles';

const FAVORITOS_KEY = "@TreinamentoReactNative:favoritos";

function Favoritos() {
    const [favoritos, setFavoritos] = useState<FavoritoDTO[]>([]);

    const isFocused = useIsFocused();

    async function getFavoritos() {
        const favoritosStorage = await AsyncStorage.getItem(FAVORITOS_KEY);
        if (favoritosStorage) {
            const favoritosParse = JSON.parse(favoritosStorage) as FavoritoDTO[];
            setFavoritos(favoritosParse);
        }
    }

    async function removerStorage(id: number) {
        const favoritos = await AsyncStorage.getItem(FAVORITOS_KEY);        
        if(favoritos){
            const favoritosParse = JSON.parse(favoritos) as FavoritoDTO[];
            const filtrados = favoritosParse.filter(f => f.pokemon.id !== id);
            await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(filtrados));
            getFavoritos();
        }
    }

    useEffect(() => {
        getFavoritos();
    }, [isFocused]);

    return (
        <Container>
            <Header>
                <Titulo>Favoritos</Titulo>
            </Header>
            <FlatList
                data={favoritos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <FavoriteCard 
                        pokemon={item.pokemon}
                        funcaoRemover={() => removerStorage(item.pokemon.id)}
                    />
                )}
                style={{
                    width: "100%",
                    paddingTop: 33,
                    paddingBottom: 0,
                }}
            />
        </Container>
    )
}

export default Favoritos;