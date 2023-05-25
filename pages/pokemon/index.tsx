import React, { FC, useRef, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Select,
    MenuItem,
    Hidden,
    InputBase,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { BASE_API_URL } from "@constants/config";
import api from "@utils/api";

import Navbar from "@components/navbar/Navbar";
import TopNavbar from "@components/navbar/TopNavbar";
import PokeCardList from "@components/card/PokeCardList";
import DetailPokeDialog from "@components/dialog/DetailPokeDialog";
import LoadingCard from "@components/loading/LoadingCard";
import PokemonGroupIcon from "@public/icons/pokemon-group-icon.svg";

const paginationInit = {
    count: 0,
    next: "",
    previous: "",
};

const SelectInput = withStyles(() => ({
    input: {
        borderRadius: 8,
        position: "relative",
        border: "2px solid #fff",
        fontSize: 20,
        fontWeight: 700,
        padding: "8px 14px",
        color: "#fff",
        "&:focus": {
            borderRadius: 8,
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    pagination: {
        "& .MuiPaginationItem-rounded": {
            border: "2px solid #fff",
            borderRadius: "8px",
            fontSize: "20px",
            fontWeight: 700,
            color: "#fff",
        },
        "& .MuiPaginationItem-page.Mui-selected": {
            background: "#fff",
            color: "#E6AB09",
        },
    },
    contentSubtitle: {
        fontSize: "24px",
        fontWeight: 300,
        lineHeight: "36px",
        color: "#42494D",
        textAlign: "center",
        marginBottom: "16px",
    },
    whiteText: {
        color: "#fff",
        lineHeight: "20px",
        fontWeight: 700,
        fontSize: "20px",
    },
    msFontSize: {
        fontSize: "32px",
        textAlign: "left",
        [theme.breakpoints.up(600)]: {
            fontSize: "52px",
        },
    },
}));

const PokemonList: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const pokeDex = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [dialogDetail, setDialogDetail] = useState({
        open: false,
        data: null,
    });
    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(paginationInit);

    const [pokeList, setPokeList] = useState([]);

    useEffect(() => {
        fetchData();
    }, [page, limit]);

    const fetchData = async () => {
        setIsLoading(true);
        const offset = (page - 1) * limit;
        const param = `offset=${offset}&limit=${limit}`;

        const res = (await api(BASE_API_URL)).get(`pokemon/?${param}`);
        const resData = (await res).data;

        const _results = [...resData.results];
        const _pokeList = [];

        for (let i = 0; i < _results.length; i++) {
            const arr = _results[i].url.split("/");
            const path = `pokemon/${arr[6]}`;

            const res = (await api(BASE_API_URL)).get(path);
            const resData = (await res).data;
            const pokemon = { ..._results[i], ...resData };
            _pokeList.push(pokemon);
        }

        setPagination({
            count: resData.count,
            next: resData.next,
            previous: resData.previous,
        });
        setPokeList(_pokeList);
        setIsLoading(false);
    };

    const onLimitChange = (e) => {
        setLimit(e.target.value);
    };

    const onPageChange = (e, page) => {
        setPage(page);
    };

    const goToPokeList = () =>
        pokeDex.current.scrollIntoView({ behavior: "smooth" });

    return (
        <Container maxWidth="xl" className="p-0">
            <TopNavbar />
            <Navbar />
            <Box
                component="div"
                px={15}
                style={{ height: `calc(100% - 100px)` }}
            >
                <Grid
                    container
                    style={{ height: "100%" }}
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box component="div">
                            <Typography
                                align="center"
                                variant="h4"
                                component="h3"
                                className={classes.msFontSize}
                            >
                                All the Pokémon data youll ever need in one
                                place!
                            </Typography>
                            <Typography
                                align="center"
                                variant="h6"
                                component="h6"
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "400",
                                    lineHeight: "30px",
                                    color: "#7B8082",
                                    textAlign: "left",
                                    marginTop: "32px",
                                }}
                            >
                                Thousands of data compiled into one place
                            </Typography>
                            <Box component="div" textAlign={"left"} mt={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disableRipple
                                    style={{
                                        borderRadius: "14px",
                                        padding: "16px 32px",
                                        background: "#E6AB09",
                                        fontSize: "20px",
                                        fontWeight: "700",
                                        lineHeight: "30px",
                                        color: "#fff",
                                        textTransform: "none",
                                    }}
                                    onClick={goToPokeList}
                                >
                                    Check PokèDex
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item xs={12} sm={6}>
                            <Image
                                src={PokemonGroupIcon}
                                width={534}
                                height={631}
                            />
                        </Grid>
                    </Hidden>
                </Grid>
            </Box>

            <Box
                component="div"
                p={15}
                style={{
                    backgroundImage: "url(/images/background-content.png)",
                    backgroundSize: "cover",
                }}
                ref={pokeDex}
            >
                <Typography
                    align="center"
                    style={{
                        fontSize: "40px",
                        fontWeight: "700",
                        lineHeight: "60px",
                        color: "#42494D",
                        marginBottom: "16px",
                    }}
                >
                    PokèDex
                </Typography>
                <Typography
                    variant="h2"
                    className={classes.contentSubtitle}
                    // style={{
                    //     fontSize: "24px",
                    //     fontWeight: "300",
                    //     lineHeight: "36px",
                    //     color: "#42494D",
                    //     textAlign: "center",
                    //     marginBottom: "16px",
                    // }}
                >
                    All Generation Totaling
                </Typography>
                <Typography
                    variant="h2"
                    style={{
                        fontSize: "24px",
                        fontWeight: "300",
                        lineHeight: "36px",
                        color: "#42494D",
                        textAlign: "center",
                        marginBottom: "70px",
                    }}
                >
                    1000 Pokemon
                </Typography>
                <Grid container spacing={10}>
                    {pokeList.map((poke) => {
                        return (
                            <Grid
                                item
                                key={poke.id}
                                xs={12}
                                sm={6}
                                md={4}
                                style={{
                                    paddingBottom: "24px",
                                    paddingTop: "24px",
                                }}
                            >
                                <PokeCardList
                                    item={poke}
                                    onCardClick={() =>
                                        setDialogDetail({
                                            open: true,
                                            data: poke,
                                        })
                                    }
                                />
                            </Grid>
                        );
                    })}
                    {isLoading &&
                        [0, 1, 2].map((val) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    style={{
                                        paddingBottom: "24px",
                                        paddingTop: "24px",
                                    }}
                                    key={val}
                                >
                                    <LoadingCard />
                                </Grid>
                            );
                        })}
                </Grid>

                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    my={5}
                    className="pagination"
                >
                    <Box component="div" className={classes.whiteText}>
                        Per Page:{" "}
                        <Box component={"span"}>
                            <Select
                                variant="outlined"
                                input={<SelectInput />}
                                value={limit}
                                onChange={onLimitChange}
                            >
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={21}>21</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    <Pagination
                        size="large"
                        count={10}
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                        className={classes.pagination}
                        onChange={onPageChange}
                    />
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                    >
                        <Typography className={classes.whiteText}>
                            Total Data: {pagination.count}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <DetailPokeDialog
                data={dialogDetail.data}
                open={dialogDetail.open && dialogDetail.data}
                onClose={() => setDialogDetail({ open: false, data: null })}
            />
        </Container>
    );
};

export default PokemonList;
