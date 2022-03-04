import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import axios from 'axios';


export default function HomePage() {

    const [pokemon, setPokemon] = React.useState([]);
    const [pokemonData, setPokemonData] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [buttonText, setButtonText] = React.useState("Mais Detalhes");




    const showOrHide = () => {

        setShow(!show)
        setButtonText(!buttonText)

        if (setShow == true) {
            setShow(false)
            setButtonText("Menos Detalhes")
        }

        console.log(buttonText)

    }


    const getPokemon = async () => {
        const toArray = [];
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
            const res = await axios.get(url);
            toArray.push(res.data);
            setPokemonData(toArray);
            console.log(res)
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: 'url(https://wallpapercave.com/wp/xLZrFev.png)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >

                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '650px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >

                    <Box
                        as="form"
                        onSubmit={function (e) {
                            e.preventDefault();
                            getPokemon();
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >

                        <TextField
                            onChange={function (e) {
                                setPokemon(e.target.value.toLowerCase())
                            }}
                            pattern="[A-Za-z]+$"
                            autoComplete="off"
                            placeholder='Busque por um Pokémon'
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />

                        <Text
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                                fontSize: '13px',
                                marginTop: '20px',
                                padding: '3px 10px',
                                borderRadius: '10px'
                            }}
                        >Busque pelo nome do Pokémon(em inglês) e pressione Enter
                        </Text>


                        {pokemonData.map((data) => {
                            return (
                                <Box>
                                    <Box
                                        styleSheet={{
                                            display: 'grid',
                                            gridTemplateColumns: '200px 200px',
                                            justifyContent:'center',
                                            padding: '16px',
                                        }}
                                    >
                                        <Text
                                            variant="body2"
                                            styleSheet={{
                                                color: appConfig.theme.colors.neutrals['000'],
                                                backgroundColor: appConfig.theme.colors.neutrals[700],
                                                textTransform: 'capitalize',
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection:'column',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <table style={{
                                                display:'flex',
                                                flexDirection:'column',
                                                alignItems:'flex-start'
                                            }}>
                                                <tr>
                                                    <td><b>ID</b> # {data.id}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Nome:</b> {data.name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Altura:</b> {data.height / 10} mt
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Peso:</b> {data.weight / 10} kg
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Habilidades:</b></td>
                                                    <td style={{
                                                        display:'flex'
                                                    }}>
                                                        {data.abilities.map((ability) => (
                                                            <li style={{padding: '0px 7px 0px 0px'}}>
                                                            {ability.ability.name}
                                                          </li>
                                                        ))}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{display:'flex'}}>
                                                    <b>Tipo:</b> {data.types.map((typeInfo) => (
                                                            <li style={{padding: '0px 7px 0px 7px'}}>
                                                            {typeInfo.type.name}
                                                            </li>
                                                        ))}
                                                    </td>
                                                </tr>
                                            </table>
                                        </Text>
                                        <Image
                                            styleSheet={{
                                                backgroundColor: appConfig.theme.colors.neutrals[700],
                                                height: '100%',
                                                width: '100%',

                                            }}
                                            src={data.sprites['front_default']}
                                        />
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

