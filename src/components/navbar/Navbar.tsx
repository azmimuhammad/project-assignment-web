import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";
import useTranslation from "next-translate/useTranslation";
import PokemonIcon from "@public/icons/pokemon-icon.svg";

const useStyles = makeStyles((theme) => ({
    link: {
        fontSize: "16px",
        lineHeight: "24px",
        cursor: "pointer",
    },
    msFontSize: {
        fontSize: "32px",
        textAlign: "left",
        [theme.breakpoints.up(600)]: {
            fontSize: "52px",
        },
    },
}));

const Navbar: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const router = useRouter();
    const { locale } = router;

    const navigations = [
        { label: t("home:nav-home"), to: "/pokemon" },
        { label: "Pokemon Type", to: "/pokemon/type" },
    ];

    console.info({ locale: t("home:navbar-1") });
    return (
        <Box
            display="flex"
            px={15}
            my={1}
            alignItems={"center"}
            style={{ gap: 40 }}
        >
            <Image
                src={PokemonIcon}
                width={167}
                height={59}
                alt="Picture of the author"
            />
            {navigations.map((nav, idx) => {
                const isActive = router.pathname === nav.to;
                return (
                    <Box className={classes.link} key={idx}>
                        <Link href={nav.to}>
                            <Typography
                                className={classes.link}
                                style={{
                                    color: isActive ? "#f58220" : "#000",
                                    fontWeight: isActive ? 700 : 500,
                                }}
                            >
                                {nav.label}
                            </Typography>
                        </Link>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Navbar;
