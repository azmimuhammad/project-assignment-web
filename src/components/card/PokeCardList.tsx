import { useRouter } from "next/router";
import { Card, CardContent, Box, Typography, Chip } from "@material-ui/core";
import { COLORS } from "@pages/pokemon/detail/[id]";

import NoImageComponent from "@components/empty-state/NoImage";

interface CardProps {
    onCardClick: () => void;
    item: any;
}

const PokeCardList = (props: CardProps) => {
    const { onCardClick, item } = props;

    const router = useRouter()

    return (
        <Card
            variant="outlined"
            style={{
                borderRadius: "24px",
                cursor: "pointer",
            }}
            onClick={onCardClick}
        >
            <CardContent style={{ padding: "40px 24px" }}>
                <Box
                    component={"div"}
                    style={{ width: "100%", aspectRatio: "1/1" }}
                >
                    {item.sprites.front_default ? (
                        <img
                            src={item.sprites.front_default}
                            alt="pokemon-image"
                            style={{ width: "100%" }}
                        />
                    ) : (
                        <NoImageComponent />
                    )}
                </Box>
                <Typography
                    variant="h6"
                    component="h6"
                    style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        lineHeight: "20px",
                        color: "#B3B6B8",
                        textAlign: "left",
                        marginTop: "10px",
                    }}
                >
                    {`#${("0000" + item.id).slice(-4)}`}
                </Typography>
                <Typography
                    variant="h6"
                    component="h6"
                    style={{
                        fontSize: "40px",
                        fontWeight: "700",
                        lineHeight: "60px",
                        color: "#42494D",
                        textAlign: "left",
                        marginTop: "10px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        textTransform: "capitalize",
                    }}
                >
                    {item.name}
                </Typography>
                <Box display={"flex"} flexWrap={"wrap"} style={{ gap: 5 }}>
                    {item.types.map((t, i) => {
                        const getColor =
                            COLORS[Math.floor(Math.random() * COLORS.length)];

                        return (
                            // <Link
                            //     href={{
                            //         pathname: "/pokemon/type",
                            //         query: { name: t.type.name },
                            //     }}
                            //     key={i}
                            // >
                            <Chip
                                label={t.type.name}
                                style={{
                                    backgroundColor: getColor,
                                    fontWeight: 700,
                                    color: "#fff",
                                    textTransform: "capitalize",
                                }}
                            />
                            // </Link>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};

export default PokeCardList;
