import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, View } from 'react-native';
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
import { useFavorite } from "../../hooks/favorite";

interface ParametrosRota {
    pokemon: PokemonDTO;
}

function Detalhes() {

    const [pokemon, setPokemon] = useState<PokemonDTO>();
    const [favorito, setFavorito] = useState<boolean>();
    const favorite = useFavorite();
    const tema = useTheme()
    const route = useRoute();
    const isFocused = useIsFocused();

    async function verificaFavoritos(id:number) {
        const resultado = await favorite.validarFavorito(id);
        setFavorito(resultado);
    }

    useEffect(() => {
        const parametros = route.params as ParametrosRota;
        console.log(parametros.pokemon);
        setPokemon(parametros.pokemon);
        verificaFavoritos(parametros.pokemon.id);
    }, [isFocused])

    async function addPokemonFav(pokemon: PokemonDTO){
        favorite.addFavoritos(pokemon);
        setFavorito(favorito => !favorito);
    }

    async function removePokemonFav(pokemon: PokemonDTO){
        Alert.alert('Confirme', 
        `Deseja realmente remover o ${pokemon.name} do seus favoritos?`,
        [
            {
                text: 'Não 😊',
                style: "cancel",
                onPress: () => {}
            },
            {
                text: 'Sim 😢',
                onPress: () => {
                    favorite.removerStorage(pokemon.id);
                    setFavorito(favorito => !favorito);
                }
            }
        ])
    }

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
                <BotaoHeader
                    onPress={() => {
                        favorito ? 
                        removePokemonFav(pokemon) :
                        addPokemonFav(pokemon)
                    }}
                >
                    {
                        favorito ? 
                        <MaterialCommunityIcons
                            name="heart"
                            size={22}
                            color={tema.background}
                        /> :
                        <Feather
                            name="heart"
                            size={22}
                            color={tema.background}
                        />
                    }
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