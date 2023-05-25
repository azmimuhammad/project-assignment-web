import { FC } from "react";

import { Card, CardContent, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const LoadingCard: FC = () => {
    return (
        <Card
            variant="outlined"
            style={{
                borderRadius: "24px",
                cursor: "pointer",
            }}
        >
            <CardContent
                component={Box}
                display={"flex"}
                flexDirection={"column"}
                style={{ padding: "40px 24px", gap: 10 }}
            >
                <Box
                    component={"div"}
                    style={{ width: "100%", aspectRatio: "1/1" }}
                >
                    <Skeleton
                        variant="rect"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Box>
                <Skeleton
                    variant="rect"
                    style={{ width: "25%", height: "20px" }}
                />
                <Skeleton
                    variant="rect"
                    style={{ width: "100%", height: "40px" }}
                />
                <Skeleton
                    variant="rect"
                    style={{
                        width: "30%",
                        height: "40px",
                        borderRadius: "20px",
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default LoadingCard;
