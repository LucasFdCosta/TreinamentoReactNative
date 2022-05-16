import React from "react";
import { PokemonTypes } from "../../dtos/PokemonDTO";
import { Container, Tipo } from "./styles";

interface TypeCardProps {
    tipoPokemon: PokemonTypes;
}

function TypeCard({tipoPokemon, ...rest}: TypeCardProps) {
    return (
        <Container type={tipoPokemon.name} {...rest}>
            <Tipo>
                {tipoPokemon.name}
            </Tipo>
        </Container>
    )
}

export default TypeCard;