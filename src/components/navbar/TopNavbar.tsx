import React, { FC } from "react";
import { Box, Select, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";
import { Language } from "@material-ui/icons";
import setLanguage from "next-translate/setLanguage";

const TopNavbar: FC = () => {
    const route = useRouter();
    const { locale } = route;

    const handleChange = async (event) => {
        await setLanguage(event.target.value);
    };

    return (
        <Box
            component="div"
            px={15}
            my={0}
            style={{
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#FAFAFA",
            }}
        >
            <Box component={"div"} style={{ marginRight: "4px" }}>
                <Language style={{ fontSize: "18px", marginTop: "6px" }} />
            </Box>
            <Select
                value={locale}
                onChange={handleChange}
                inputProps={{ "aria-label": "Without label" }}
                disableUnderline
                style={{
                    fontSize: "12px",
                    lineHeight: "18px",
                    fontWeight: 400,
                }}
            >
                <MenuItem value={`en`}>English</MenuItem>
                <MenuItem value={`id`}>Indonesia</MenuItem>
            </Select>
        </Box>
    );
};

export default TopNavbar;
