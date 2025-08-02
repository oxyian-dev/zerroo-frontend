import { Box, Button, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-premium";
import { IconList } from "@tabler/icons";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../../components/ServerDataGrid";
import AdjustmentDetails from "./AdjustmentDetails";

const AdjustmentList = () => {
    const datatype = []
    datatype[4] = 'dateTime'
    const filter = [false]
    const sortable = [false]
    const render = [({ value }) => <IconButton component={Link} to={`/admin/stocks/adjustment/${value}`}>
        <IconList />
    </IconButton>]

    const ListDetailComponent = useCallback(({ row }) => {
        const apiRef = useGridApiContext();
        const [width, setWidth] = useState(() => {
            const dimensions = apiRef.current.getRootDimensions();
            return dimensions.viewportInnerSize.width;
        });

        const handleViewportInnerSizeChange = useCallback(() => {
            const dimensions = apiRef.current.getRootDimensions();
            setWidth(dimensions.viewportInnerSize.width);
        }, [apiRef]);

        useEffect(() => {
            return apiRef.current.subscribeEvent(
                'viewportInnerSizeChange',
                handleViewportInnerSizeChange,
            );
        }, [apiRef, handleViewportInnerSizeChange]);

        return (
            <Box width={width} p={2} borderTop={1}>
                <AdjustmentDetails id={row.id} />
            </Box>
        )
    }, [])

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Stock Adjustment List</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                sortable={sortable}
                filter={filter}
                render={render}
                datatype={datatype}
                getDetailPanelContent={({ row }) => <ListDetailComponent row={row} />}
                getDetailPanelHeight={() => 'auto'}
                ajax={{ url: '/api/stocks/adjustment' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "Description", "field": "Description", "width": "200", "id": "Description" },
                    { "headerName": "Reason", "field": "Reason", "width": "200", "id": "Reason" },
                    { "headerName": "Owner", "field": "Owner", "width": "200", "id": "Owner" },
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" }]}
            />
        </Stack>
    )
}
export default AdjustmentList;