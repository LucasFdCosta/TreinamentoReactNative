import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from 'react-native';
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
    ConteudoSvg,
    Tipos,
    LabelDestaque,
    Sobre
} from "./styles";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import TypeCard from "../../components/TypeCard";
import { useTheme } from "styled-components";
import AboutData from "../../components/AboutData";
import BaseStats from "../../components/BaseStats";

interface ParametrosRota {
    pokemon: PokemonDTO;
}

function Detalhes() {

    const [pokemon, setPokemon] = useState<PokemonDTO>();
    const tema = useTheme()
    const route = useRoute();

    useEffect(() => {
        const parametros = route.params as ParametrosRota;
        console.log(parametros.pokemon);
        setPokemon(parametros.pokemon);
    }, [])

    const navigation = useNavigation();

    function voltar() {
        navigation.goBack();
    }

    if (!pokemon) return <View/>

    return (
        <Container
            type={pokemon.types[0].name}
        >
            <Header>
                <ConteudoTitulo>
                    <BotaoHeader
                        onPress={() => voltar()}
                    >
                        <Feather
                            name="arrow-left"
                            size={18}
                            color={tema.white}
                        />
                    </BotaoHeader>
                    <Nome>{pokemon?.name}</Nome>
                    <Codigo>{pokemon?.code}</Codigo>
                </ConteudoTitulo>
                <BotaoHeader>
                    <MaterialCommunityIcons
                        name="heart"
                        size={22}
                        color={tema.white}
                    />
                </BotaoHeader>
            </Header>
            <Conteudo>
                <ConteudoSvg>
                    {retornaSvg(pokemon.name, 200, 200)}
                </ConteudoSvg>
                <Tipos>
                    {pokemon.types.map(p => (
                        <TypeCard tipoPokemon={p} key={p.id}/>
                    ))}
                </Tipos>
                <LabelDestaque
                    type={pokemon.types[0].name}
                >
                    About
                </LabelDestaque>
                <AboutData 
                    height={pokemon.about.height}
                    weight={pokemon.about.weight}
                    moves={pokemon.moves}
                />
                <Sobre>{pokemon.about.description}</Sobre>
                <LabelDestaque
                    type={pokemon.types[0].name}
                >
                    Base Stats
                </LabelDestaque>
                <BaseStats 
                    pokemonType={pokemon.types[0].name}
                    stats={pokemon.base_stats}
                />
            </Conteudo>
        </Container>
    )
}

export default Detalhes;