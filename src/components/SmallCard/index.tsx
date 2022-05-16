import React from "react";

import { 
    Container, 
    ConteudoCodigo, 
    Codigo,
    ConteudoSvg,
    ConteudoNome,
    Nome
} from './styles';


import { PokemonDTO } from "../../dtos/PokemonDTO";
import retornaSvg from "../../utils/retornaSvg";
import { useNavigation } from "@react-navigation/native";

//Removido o extends sem necessidade já que o Container ja contem as propriedades que precisamos
interface SmallCardProps{
    pokemon: PokemonDTO;
}

function SmallCard({pokemon, ...rest}: SmallCardProps) {

    //Logica de navegação, ja que esse componente não receberá dados diferentes de um pokemon
    const navigation = useNavigation();

    function navegarParaDetalhes(pokemon: PokemonDTO) {        
        navigation.navigate('Detalhes' as never, {
            pokemon: pokemon
        } as never);
    }
    
    return (        
        <Container
            type={pokemon.types[0].name}
            onPress={() => navegarParaDetalhes(pokemon)}
            {...rest}            
        >
            <ConteudoCodigo>
                <Codigo type={pokemon.types[0].name}>{pokemon.code}</Codigo>
            </ConteudoCodigo>
            <ConteudoSvg>
                {
                    retornaSvg(pokemon.name)
                }
            </ConteudoSvg>
            <ConteudoNome type={pokemon.types[0].name}>
                <Nome>{pokemon.name}</Nome>
            </ConteudoNome>
        </Container>
    )
}

export default SmallCard;