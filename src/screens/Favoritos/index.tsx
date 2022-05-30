import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import FavoriteCard from "../../components/FavoriteCard";
import { useFavorite } from "../../hooks/favorite";
import {
    Container,
    Header,
    Titulo
} from './styles';

function Favoritos() {
    const {
		favoritos,
        listarFavoritosStorage,
        removerStorage,
        addFavoritos,
        validarFavorito
} = useFavorite();

    const isFocused = useIsFocused();

    useEffect(() => {
        listarFavoritosStorage();
    }, [isFocused])

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