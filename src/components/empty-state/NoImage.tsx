import { Box } from "@material-ui/core";

const NoImageComponent = () => {
    return (
        <Box
            component={"div"}
            style={{
                background: "#B3B6B8",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: "400",
                lineHeight: "30px",
                color: "#fff",
            }}
        >
            <div>No Image</div>
        </Box>
    );
};

export default NoImageComponent;
