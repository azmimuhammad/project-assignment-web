import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Axios from "axios";

import {
    Box,
    Container,
    Typography,
    Grid,
    makeStyles,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

import api from "@utils/api";
import { BASE_API_URL } from "@constants/config";

import TopNavbar from "@components/navbar/TopNavbar";
import Navbar from "@components/navbar/Navbar";
import PokemonDetail from "@components/detail/PokemonDetail";

export const COLORS = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#9E9E9E",
    "#607D8B",
];

const useStyles = makeStyles(() => ({
    label: {
        fontSize: "20px",
        lineHeight: "30px",
        fontWeight: 700,
    },
    roundedDiv: {
        borderRadius: "50%",
        aspectRatio: "1/1",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    statNumber: {
        fontSize: "32px",
        fontWeight: 700,
        textAlign: "center",
    },
    statLabel: {
        fontSize: "20px",
        fontWeight: 400,
        textAlign: "center",
        width: "min-content",
        alignSelf: "center",
    },
}));

const DetailPokemon: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const router = useRouter();
    const { id } = router.query;

    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [evolutions, setEvolutions] = useState([]);

    useEffect(() => {
        getDetail();
        getEvo();
    }, []);

    // useEffect(() => {

    //     if (evolutions.length === 0) getEvo();
    // }, [evolutions]);

    const getDetail = async () => {
        setIsLoading(true);
        await Axios.get(`${BASE_API_URL}/pokemon/${id}`)
            .then((res) => {
                console.log("detail", res.data);
                setPokemon(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    };

    const getSpecies = async (url) => {
        const pokeId = url.split("/")[6];

        const species = await Axios.get(
            `${BASE_API_URL}/pokemon/${parseInt(pokeId)}`,
        );
        const { data } = species;

        // return { image: data.sprites.front_default };
        return data;
    };

    // console.info(getSpecies("https://pokeapi.co/api/v2/pokemon-species/1/"));

    const getEvo = async () => {
        const evo = [];
        const hasNext = false;
        const nextEvo = "";

        const _evolution = await Axios.get(
            `${BASE_API_URL}/evolution-chain/${id}`,
        );
        const _evo = _evolution.data;
        console.info({ _evo });
        const species = await getSpecies(_evo.chain.species.url);
        // const species = await Axios.get(
        //     `${BASE_API_URL}/pokemon/${parseInt(
        //         _evo.chain.species.url.split("/")[6],
        //     )}`,
        // );
        evo.push({
            ..._evo.chain.species,
            images: species.sprites.front_default,
        });

        _evo.chain.evolves_to.forEach((ev1) => {
            evo.push({ ...ev1.species });

            if (ev1.evolves_to.length) {
                ev1.evolves_to.forEach((ev2) => {
                    evo.push({ ...ev2.species });

                    if (ev2.evolves_to.length) {
                        ev2.evolves_to.forEach((ev3) => {
                            evo.push({ ...ev3.species });
                        });
                    }
                });
            }
        });

        const evoData = [];
        Promise.all(evo.map((ev) => getSpecies(ev.url))).then(
            (res) => {
                console.log("res", res);
                setEvolutions([...res]);
            },
        );

        setEvolutions([...evoData]);
    };
    
    return (
        <Container maxWidth="xl" className="p-0">
            <TopNavbar />
            <Navbar />
            ``
            <Box
                component="div"
                display={"flex"}
                flexDirection={"column"}
                px={15}
                my={7}
            >
                <PokemonDetail
                    data={{
                        image: pokemon?.sprites.front_default,
                        name: pokemon?.name,
                        weight: pokemon?.weight,
                        height: pokemon?.height,
                        abilities: pokemon?.abilities,
                        types: pokemon?.types,
                    }}
                />
            </Box>
            <Box
                component="div"
                display={"flex"}
                flexDirection={"column"}
                px={15}
                style={{ gap: 30 }}
            >
                {pokemon && pokemon.sprites && (
                    <Box
                        component="div"
                        display={"flex"}
                        flexDirection={"column"}
                        style={{ gap: 30 }}
                    >
                        <Typography className={classes.label}>
                            Other Images:
                        </Typography>
                        <Box
                            display={"flex"}
                            style={{ gap: 30 }}
                            flexWrap={"wrap"}
                        >
                            {Object.keys(pokemon.sprites).map((spr, sprx) => {
                                if (
                                    pokemon.sprites[spr] &&
                                    typeof pokemon.sprites[spr] === "string"
                                ) {
                                    return (
                                        <Box
                                            component={"div"}
                                            style={{
                                                width: "169px",
                                                height: "169px",
                                                backgroundColor: "#B3B6B8",
                                            }}
                                            key={sprx}
                                        >
                                            <img
                                                src={pokemon.sprites[spr]}
                                                style={{ width: "100%" }}
                                                alt="pokemon-image"
                                            />
                                        </Box>
                                    );
                                }

                                return "";
                            })}
                        </Box>
                    </Box>
                )}

                {pokemon && pokemon.stats && (
                    <Box
                        component="div"
                        display={"flex"}
                        flexDirection={"column"}
                        style={{ gap: 30 }}
                    >
                        <Typography className={classes.label}>
                            Stats:
                        </Typography>
                        <Grid container spacing={2}>
                            {pokemon?.stats?.map((stat, idx) => {
                                const getColor =
                                    COLORS[
                                        Math.floor(
                                            Math.random() * COLORS.length,
                                        )
                                    ];

                                return (
                                    <Grid item xs={12} md={2} key={idx}>
                                        <Box
                                            component={"div"}
                                            className={classes.roundedDiv}
                                            style={{
                                                border: `20px solid ${getColor}`,
                                                maxWidth: "170px",
                                                maxHeight: "170px",
                                            }}
                                        >
                                            <Typography
                                                className={classes.statNumber}
                                            >
                                                {stat.base_stat}
                                            </Typography>
                                            <Typography
                                                className={classes.statLabel}
                                            >
                                                {stat.stat.name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}

                <Box
                    component="div"
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ gap: 30 }}
                >
                    <Typography className={classes.label}>
                        Evolution:
                    </Typography>
                    <Box display={"flex"} style={{ gap: 10 }} flexWrap={"wrap"}>
                        {evolutions.map((evo, idx) => {
                            const getColor =
                                COLORS[
                                    Math.floor(Math.random() * COLORS.length)
                                ];

                            // const species = await getSpecies(evo.url);
                            // console.info({ species });

                            return (
                                <>
                                    {idx > 0 && (
                                        <Box component={"div"}>
                                            <ArrowForward
                                                style={{
                                                    fontSize: 70,
                                                    color: "#42494D",
                                                    marginTop: `${197 / 3}px`,
                                                }}
                                            />
                                        </Box>
                                    )}

                                    <Box
                                        display={"flex"}
                                        flexDirection={"column"}
                                        style={{
                                            width: "min-content",
                                            gap: 10,
                                        }}
                                    >
                                        <Box
                                            className={classes.roundedDiv}
                                            style={{
                                                border: `10px solid ${getColor}`,
                                                width: "195px",
                                            }}
                                        >
                                            {/* {species.image} */}
                                        </Box>
                                        <Typography
                                            className={classes.label}
                                            align="center"
                                        >
                                            {evo.name}
                                        </Typography>
                                    </Box>
                                </>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default DetailPokemon;
