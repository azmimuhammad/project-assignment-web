import React, { FC } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import {
    Typography,
    Button,
    Grid,
    Box,
    Dialog,
    withStyles,
    makeStyles,
    useRadioGroup,
    Chip,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PokemonDetail from "@components/detail/PokemonDetail";

import { IPokemonDetailData } from "@components/detail/PokemonDetail";

const styles: any = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(3),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

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

const typesColor = [
    "#E66D00",
    "#DE2C2C",
    "#01B956",
    "#E34C88",
    "#4350E6",
    "#FFAF66",
];

const DialogTitle: any = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other }: any = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: `${theme.spacing(0)}px ${theme.spacing(6)}px ${theme.spacing(
            6,
        )}px ${theme.spacing(6)}px`,
    },
}))(MuiDialogContent);

const DetailPokeDialog: FC<any> = ({
    open,
    onClose,
    data,
}: // pokemon,
{
    open: boolean;
    onClose: () => {};
    data: any;
    // pokemon: any;
}) => {
    const classes = useStyles();
    const router = useRouter();
    const { t } = useTranslation();

    // const getTypeColor = (type) => {
    //     const url = type.type.url;
    //     const arrUrl = url && url.split("/");
    //     const num = arrUrl[6];
    //     if (num <= 6) {
    //         return typesColor[num - 1];
    //     }
    //     return typesColor[5];
    // };
    console.info({ data });
    const detail: IPokemonDetailData = {
        image: data?.sprites.front_default,
        name: data?.name,
        weight: data?.weight,
        height: data?.height,
        abilities: data?.abilities,
        types: data?.types,
    };
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="customized-dialog-title" onClose={onClose} />
            <DialogContent>
                <PokemonDetail detailButton data={detail} />
            </DialogContent>
        </Dialog>
    );
};

export default DetailPokeDialog;
