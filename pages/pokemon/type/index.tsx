import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Axios from "axios";

import {
    Box,
    Container,
    Typography,
    makeStyles,
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    InputBase,
    Select,
    MenuItem,
    withStyles,
} from "@material-ui/core";
import { Pagination, Skeleton } from "@material-ui/lab";

import { BASE_API_URL } from "@constants/config";
import api from "@utils/api";

import { COLORS } from "../detail/[id]";
import { BGType } from "@components/icons";

import TopNavbar from "@components/navbar/TopNavbar";
import Navbar from "@components/navbar/Navbar";
import NoImageComponent from "@components/empty-state/NoImage";
import LoadingTableRow from "@components/loading/LoadingTableRow";

const useStyles = makeStyles(() => ({
    label: {
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: "24px",
    },
    type: {
        fontSize: "14px",
        lineHeight: "21px",
        cursor: "pointer",
    },
    tableText: {
        color: "#42494D",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "15px",
        textTransform: "capitalize",
    },
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#FAFAFA",
        },
    },
}));

const SelectInput = withStyles(() => ({
    input: {
        borderRadius: 8,
        position: "relative",
        border: "2px solid #fff",
        fontSize: "16px",
        padding: "8px 14px",
        // color: "#fff",
        "&:focus": {
            borderRadius: 8,
        },
    },
}))(InputBase);

const DetailPokemon: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const router = useRouter();
    const { name } = router.query;
    
    const [types, setTypes] = useState([]);
    const [detailType, setDetailType] = useState([]);
    const [currentType, setCurrentType] = useState("");
    const [currentColor, setCurrentColor] = useState("#FAFAFA");
    const [loading, setLoading] = useState({ list: false, detail: true });
    const [pagination, setPagination] = useState({
        limit: 9,
        page: 0,
        total: "",
    });

    useEffect(() => {
        getTypes();
    }, []);

    useEffect(() => {
        getDetailType(currentType);
    }, [currentType]);

    const getTypes = async () => {
        setLoading({ ...loading, list: true });
        await Axios.get(`${BASE_API_URL}/type/`)
            .then((res) => {
                const result = [];

                res.data.results.forEach((element) => {
                    const getColor =
                        COLORS[Math.floor(Math.random() * COLORS.length)];

                    result.push({ ...element, colorIdentity: getColor });
                });

                setCurrentType(name ? name : result[0]?.name);
                setCurrentColor(
                    name
                        ? result.find((t) => t.name === name).colorIdentity
                        : result[0]?.colorIdentity,
                );
                setTypes(result);
            })
            .catch((err) => console.error(err));

        setLoading({ ...loading, list: false });
    };

    const getDetailType = async (type) => {
        const _type = [];

        setLoading({ ...loading, detail: true });
        const getTypes = await Axios.get(`${BASE_API_URL}/type/${type}`);
        const typeList = getTypes?.data?.pokemon;

        setPagination({
            ...pagination,
            total: typeList?.length,
        });

        if (typeList?.length > 0) {
            for (let i = 0; i < typeList.length; i++) {
                const pokeId = typeList[i].pokemon.url.split("/")[6];
                const res = (await api(BASE_API_URL)).get(`pokemon/${pokeId}`);
                const resData = (await res).data;
                const pokemon = { ...typeList[i], ...resData };
                _type.push(pokemon);
            }
        }

        setDetailType(_type);
        setLoading({ ...loading, detail: false });
    };

    const onLimitChange = (e) => {
        setPagination({ ...pagination, limit: e.target.value });
    };

    const onPageChange = (e, page) => {
        setPagination({ ...pagination, page: page - 1 });
    };

    const renderedList = React.useMemo(() => {
        setLoading({ ...loading, detail: true });
        const newList = [];
        if (detailType?.length > 0) {
            for (let i = 0; i < detailType.length; i += pagination.limit) {
                const chunk = detailType.slice(i, i + pagination.limit);
                newList.push(chunk);
            }
        }
        setLoading({ ...loading, detail: false });
        return newList;
    }, [pagination, detailType]);

    return (
        <Container maxWidth="xl" className="p-0">
            <TopNavbar />
            <Navbar />
            <Box component={"div"}>
                <div
                    style={{ width: "100%", position: "absolute", zIndex: -1 }}
                >
                    <BGType color={currentColor} />
                </div>
                <Box
                    component="div"
                    display={"flex"}
                    px={15}
                    my={7}
                    style={{
                        gap: 30,
                        zIndex: 1,
                    }}
                >
                    <Box
                        display={"flex"}
                        style={{
                            gap: 25,
                            height: "max-content",
                            minHeight: "20vh",
                        }}
                    >
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            style={{
                                gap: 5,
                            }}
                        >
                            <Typography className={classes.label}>
                                Pokemon Type
                            </Typography>
                            {!loading.list
                                ? types.map((val) => {
                                      const isActive = val.name === currentType;
                                      return (
                                          <Typography
                                              className={classes.type}
                                              key={val.name}
                                              style={{
                                                  fontWeight: isActive
                                                      ? 700
                                                      : 500,
                                                  color: isActive
                                                      ? val.colorIdentity
                                                      : "#42494D",
                                                  textTransform: "capitalize",
                                              }}
                                              onClick={() => {
                                                  router.push({
                                                      query: {
                                                          name: val.name,
                                                      },
                                                  });
                                                  setCurrentType(val.name);
                                                  setCurrentColor(
                                                      val.colorIdentity,
                                                  );
                                              }}
                                          >
                                              &bull; &ensp; {val.name}
                                          </Typography>
                                      );
                                  })
                                : [0, 1, 2, 3, 4].map((val) => (
                                      <Skeleton variant="text" key={val} />
                                  ))}
                        </Box>
                        <div
                            style={{
                                borderRight: "1px solid",
                                borderColor: "#ECEDED",
                            }}
                        />
                    </Box>

                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        flexGrow={1}
                        style={{ gap: 30 }}
                    >
                        <Typography
                            variant="h4"
                            style={{ fontWeight: 700, color: "#42494D" }}
                        >
                            Pokemon with Type{" "}
                            <span style={{ textTransform: "capitalize" }}>
                                {currentType}
                            </span>
                        </Typography>
                        <TableContainer
                            component={Paper}
                            style={{
                                borderRadius: "24px",
                                boxShadow:
                                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                                backgroundColor: "rgb(255, 255, 255, 0.9)",
                            }}
                        >
                            <Table>
                                <TableBody>
                                    {loading.detail &&
                                        [0, 1, 2, 3].map((l) => {
                                            return <LoadingTableRow key={l} />;
                                        })}
                                    {!loading.detail &&
                                    renderedList[pagination.page]?.length >
                                        0 ? (
                                        renderedList[pagination.page]?.map(
                                            (val, idx) => {
                                                return (
                                                    <TableRow
                                                        className={
                                                            classes.tableRow
                                                        }
                                                        key={idx}
                                                        onClick={() =>
                                                            router.push(
                                                                `/pokemon/detail/${val.id}`,
                                                            )
                                                        }
                                                    >
                                                        <TableCell align="center">
                                                            <div
                                                                style={{
                                                                    width: "100px",
                                                                    aspectRatio:
                                                                        "1/1",
                                                                }}
                                                            >
                                                                {val.sprites
                                                                    ?.front_default ? (
                                                                    <img
                                                                        src={
                                                                            val
                                                                                .sprites
                                                                                ?.front_default
                                                                        }
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                        }}
                                                                        alt="pokemon-image"
                                                                    />
                                                                ) : (
                                                                    <NoImageComponent />
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            className={
                                                                classes.tableText
                                                            }
                                                        >
                                                            {`#${(
                                                                "0000" + val.id
                                                            ).slice(-4)}`}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            className={
                                                                classes.tableText
                                                            }
                                                        >
                                                            {val.pokemon.name}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Box
                                                                display={"flex"}
                                                                flexWrap={
                                                                    "wrap"
                                                                }
                                                                style={{
                                                                    gap: 5,
                                                                }}
                                                            >
                                                                {val.types.map(
                                                                    (t, i) => {
                                                                        const chipColor =
                                                                            types.find(
                                                                                (
                                                                                    ch,
                                                                                ) =>
                                                                                    ch.name ===
                                                                                    t
                                                                                        .type
                                                                                        .name,
                                                                            );

                                                                        return (
                                                                            <Chip
                                                                                label={
                                                                                    t
                                                                                        .type
                                                                                        .name
                                                                                }
                                                                                key={
                                                                                    i
                                                                                }
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        chipColor.colorIdentity,
                                                                                    fontWeight: 700,
                                                                                    color: "#fff",
                                                                                    textTransform:
                                                                                        "capitalize",
                                                                                }}
                                                                                onClick={(
                                                                                    e,
                                                                                ) => {
                                                                                    e.stopPropagation();
                                                                                    router.push(
                                                                                        {
                                                                                            query: {
                                                                                                name: t
                                                                                                    .type
                                                                                                    .name,
                                                                                            },
                                                                                        },
                                                                                    );
                                                                                    setCurrentType(
                                                                                        t
                                                                                            .type
                                                                                            .name,
                                                                                    );
                                                                                    setCurrentColor(
                                                                                        chipColor.colorIdentity,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        );
                                                                    },
                                                                )}
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            },
                                        )
                                    ) : (
                                        <Box
                                            display={"flex"}
                                            flexDirection={"column"}
                                            justifyContent={"center"}
                                            alignItems={"Center"}
                                            style={{ height: "200px" }}
                                        >
                                            <Typography
                                                style={{
                                                    fontSize: 30,
                                                    fontWeight: 700,
                                                    color: "#42494D",
                                                }}
                                            >
                                                Sorry, No List
                                            </Typography>
                                        </Box>
                                    )}
                                </TableBody>
                            </Table>
                            <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                m={2}
                            >
                                <Box
                                    component="div"
                                    style={{ color: currentColor }}
                                >
                                    Per Page:{" "}
                                    <Box component={"span"}>
                                        <Select
                                            variant="outlined"
                                            input={<SelectInput />}
                                            value={pagination.limit}
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
                                    count={renderedList.length}
                                    variant="outlined"
                                    shape="rounded"
                                    showFirstButton
                                    showLastButton
                                    onChange={onPageChange}
                                />
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    justifyContent={"center"}
                                >
                                    <Typography style={{ color: currentColor }}>
                                        Total Data: {pagination.total}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default DetailPokemon;
