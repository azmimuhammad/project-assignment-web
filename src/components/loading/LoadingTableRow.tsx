import { FC } from "react";

import { Box, TableRow, TableCell } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const LoadingTableRow: FC = () => {
    return (
        <TableRow>
            <TableCell align="center">
                <div
                    style={{
                        width: "100px",
                        aspectRatio: "1/1",
                    }}
                >
                    <Skeleton
                        variant="rect"
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            </TableCell>
            <TableCell align="center">
                <Skeleton
                    variant="rect"
                    style={{ width: "100%", height: "30px" }}
                />
            </TableCell>
            <TableCell align="center">
                <Skeleton
                    variant="rect"
                    style={{ width: "100%", height: "30px" }}
                />
            </TableCell>
            <TableCell align="center">
                <Box display={"flex"} flexWrap={"wrap"} style={{ gap: 5 }}>
                    {[0, 1].map((t) => {
                        return (
                            <Skeleton
                                key={t}
                                variant="rect"
                                style={{
                                    width: "60px",
                                    height: "30px",
                                    borderRadius: "20px",
                                }}
                            />
                        );
                    })}
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default LoadingTableRow;
