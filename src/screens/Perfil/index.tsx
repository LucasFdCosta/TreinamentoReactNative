import React from "react";
import { Image } from "react-native";
import { BackgroundImage, Container, Conteudo, Header, Titulo } from "./styles";

function Perfil() {
    return (
        <Container>
            <Header>
                <Titulo>Perfil</Titulo>
            </Header>

            <Conteudo>
                <BackgroundImage>
                    <Image 
                        source={{
                            uri: "https://png.pngtree.com/png-vector/20191023/ourlarge/pngtree-user-vector-icon-with-white-background-png-image_1849343.jpg"
                        }}
                        style={{
                            width: 130,
                            height: 130,
                            borderRadius: 65
                        }}
                    />
                </BackgroundImage>
                <Titulo>Lucas Costa</Titulo>
            </Conteudo>

        </Container>
    )
}

export default Perfil;