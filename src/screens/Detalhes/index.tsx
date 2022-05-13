import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState, View } from "react";
import { PokemonDTO } from "../../dtos/PokemonDTO";
import retornaSvg from "../../utils/retornaSvg";
import { 
    Container,
    Header,
    ConteudoTitulo,
    BotaoHeader,
    Nome,
    Codigo,
    Conteudo,
    ConteudoSvg
} from "./styles";

interface ParametrosRota {
    pokemon: PokemonDTO;
}

function Detalhes() {

    const [pokemon, setPokemon] = useState<PokemonDTO>();

    const route = useRoute();

    useEffect(() => {
        const parametros = route.params as ParametrosRota;
        console.log(parametros.pokemon);
        setPokemon(parametros.pokemon);
    }, [])

    if (!pokemon) return <View/>

    return (
        <Container
            type={pokemon.types[0].name}
        >
            <Header>
                <ConteudoTitulo>
                    <BotaoHeader/>
                    <Nome>{pokemon?.name}</Nome>
                    <Codigo>{pokemon?.code}</Codigo>
                </ConteudoTitulo>
                <BotaoHeader/>
            </Header>
            <Conteudo>
                <ConteudoSvg>
                    {retornaSvg(pokemon.name, 200, 200)}
                </ConteudoSvg>
            </Conteudo>
        </Container>
    )
}

export default Detalhes;