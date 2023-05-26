import React, { FC } from "react";
import { Typography, Dialog, withStyles } from "@material-ui/core";

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
}: {
    open: boolean;
    onClose: () => {};
    data: any;
    }) => {

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
