import { FC } from "react";
import { useRouter } from "next/router";

import {
    Grid,
    Box,
    Typography,
    Button,
    makeStyles,
    Chip,
} from "@material-ui/core";

import { COLORS } from "@pages/pokemon/detail/[id]";

import NoImageComponent from "@components/empty-state/NoImage";

export interface IPokemonDetailData {
    image: string;
    name: string;
    weight: string | number;
    height: string | number;
    abilities: any[];
    types: any[];
}

interface PokemonDetailProps {
    detailButton: boolean;
    data: IPokemonDetailData;
}

const useStyles = makeStyles(() => ({
    pokeName: {
        fontSize: "40px",
        fontWeight: 700,
        lineHeight: "60px",
        color: "#42494D",
        textAlign: "left",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    label: {
        display: "inline-block",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        color: "#42494D",
        marginRight: "20px",
    },
    value: {
        display: "inline-block",
        fontSize: "20px",
        fontWeight: 400,
        lineHeight: "30px",
        color: "#42494D",
        marginRight: "48px",
    },
}));

const PokemonDetail: FC = (props: PokemonDetailProps) => {
    const { detailButton = false, data } = props;
    const router = useRouter();
    const classes = useStyles();

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={5}>
                {data.image ? (
                    <img
                        src={data.image}
                        alt="pokemon-image"
                        style={{ width: "100%" }}
                    />
                ) : (
                    <NoImageComponent />
                )}
            </Grid>
            <Grid item xs={12} sm={7}>
                <Box component={"div"} style={{ marginBottom: "24px" }}>
                    <Typography
                        variant="h6"
                        component="h6"
                        style={{
                            fontSize: "40px",
                            fontWeight: "700",
                            lineHeight: "60px",
                            color: "#42494D",
                            textAlign: "left",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textTransform: "capitalize",
                        }}
                    >
                        {data.name}
                    </Typography>
                </Box>
                <Box
                    component={"div"}
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ gap: "16px" }}
                >
                    <Box display={"flex"} style={{ gap: 20 }}>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                className={classes.label}
                            >
                                Weight:&nbsp;
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                className={classes.value}
                            >
                                {data.weight}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                className={classes.label}
                            >
                                Height:&nbsp;
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                className={classes.value}
                            >
                                {data.height}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display={"flex"}>
                        <Typography
                            variant="subtitle1"
                            className={classes.label}
                        >
                            Abilities:&nbsp;
                        </Typography>
                        <Box display={"flex"} flexDirection={"column"}>
                            {data.abilities
                                ?.sort((a, b) => b.slot - a.slot)
                                .map((ab, abx) => {
                                    return (
                                        <Typography
                                            variant="subtitle1"
                                            className={classes.value}
                                            key={abx}
                                        >
                                            &bull; {ab.ability.name}{" "}
                                            {ab.is_hidden && (
                                                <span>(hidden)</span>
                                            )}
                                        </Typography>
                                    );
                                })}
                        </Box>
                    </Box>
                    <Box display={"flex"}>
                        <Typography
                            variant="subtitle1"
                            className={classes.label}
                        >
                            Type:&nbsp;
                        </Typography>
                        <Box display={"flex"} style={{ gap: 10 }}>
                            {data.types
                                ?.sort((a, b) => b.slot - a.slot)
                                .map((t, tx) => {
                                    const getColor =
                                        COLORS[
                                            Math.floor(
                                                Math.random() * COLORS.length,
                                            )
                                        ];

                                    return (
                                        <Chip
                                            label={t.type.name}
                                            key={tx}
                                            style={{
                                                backgroundColor: getColor,
                                                fontWeight: 700,
                                                color: "#fff",
                                                textTransform: "capitalize",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                router.push({
                                                    pathname: "/pokemon/type",
                                                    query: {
                                                        name: t.type.name,
                                                    },
                                                })
                                            }
                                        />
                                    );
                                })}
                        </Box>
                    </Box>
                    {detailButton && (
                        <Box component={"div"} mt={5}>
                            <Button
                                variant="contained"
                                color="primary"
                                disableRipple
                                style={{
                                    borderRadius: "14px",
                                    padding: "8px 24px",
                                    background: "#E6AB09",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    lineHeight: "30px",
                                    color: "#fff",
                                    textTransform: "none",
                                }}
                                onClick={() => router.push(`/pokemon/detail/1`)}
                            >
                                More Detail
                            </Button>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default PokemonDetail;
