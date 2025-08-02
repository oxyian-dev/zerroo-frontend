import { Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-premium";
import { IconCoin, IconCurrencyRupee, IconEdit, IconList } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { Link as Route } from 'react-router-dom';
import ServerDataGrid from "../../components/ServerDataGrid";
import fetcher from "../../utils/fetcher";
import DistributorDetails from "./DistributorDetails";

const DistributorList = () => {
    const { enqueueSnackbar } = useSnackbar();

    const datatype = [null, null, null, "boolean", "number", "number", null, "inr", "inr", "phone", "email", "dateTime", null, null,
        "number",
        "number",
        "number",
        "number",
        "number",
        "inr",
        "inr",
        "inr",
        "number",
        "number",
        null,
        null,
        null,
        null,

    ]

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
                <DistributorDetails id={row.id} />
            </Box>
        )
    }, [])

    const width = [
        200, 150, 200, 100, 130, 130, 130, 130, 130, 130, 140, 200, 100, 140, 140,
        140, 140, 140, 140, 140, 140, 140, 140, 140, 200, 140, 140, 140,140
    ]

    const editable = []
    editable[3] = true

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Distributor List</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                width={width}
                datatype={datatype}
                render={[
                    ({ value }) => (
                        <Box>
                            <IconButton title="Distributor Details" component={Route} to={`/admin/distributors/${value}`}>
                                <IconList />
                            </IconButton>
                            <IconButton title="Add PV" component={Route} to={`/admin/distributors/${value}/pv`}>
                                <IconCoin />
                            </IconButton>
                            <IconButton title="Add Wallet Amount" component={Route} to={`/admin/distributors/${value}/wallet`}>
                                <IconCurrencyRupee />
                            </IconButton>
                            <IconButton title="Edit Distributor" component={Route} to={`/admin/distributors/${value}/edit`}>
                                <IconEdit />
                            </IconButton>
                        </Box>
                    )
                ]}
                ajax={{ url: '/api/admin/users/distributors' }}
                sortable={[false]}
                filter={[false]}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                editable={editable}
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={async params => {
                    const { id, Active } = params
                    const body = new FormData();
                    body.set('status', Active);
                    const response = await fetcher(`/api/admin/users/distributors/${id}/status`, { method: 'put', body })
                    const { status } = await response.json();
                    if (status === 'success') {
                        enqueueSnackbar('Distributor Status changes', { variant: 'success' })
                    }
                    return params
                }}
                getDetailPanelContent={({ row }) => (
                    <ListDetailComponent row={row} />
                )}
                getDetailPanelHeight={() => 'auto'}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "ZID", "field": "ZID", "width": "150", "id": "ZID" },
                    { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
                    { "headerName": "Active", "field": "Active", "width": "100", "id": "Active", "type": "boolean" },
                    { "headerName": "Self PV", "field": "Self PV", "width": "130", "id": "Self PV", "type": "number" },
                    { "headerName": "Sp PV", "field": "Sp PV", "width": "130", "id": "Sp PV", "type": "number" },
                    { "headerName": "Rank", "field": "Rank", "width": "130", "id": "Rank" },
                    { "headerName": "Income Wallet", "field": "Income Wallet", "width": "130", "id": "Income Wallet", "type": "number" },
                    { "headerName": "Purchase Wallet", "field": "Purchase Wallet", "width": "130", "id": "Purchase Wallet", "type": "number" },
                    { "headerName": "Phone", "field": "Phone", "width": "130", "id": "Phone" },
                    { "headerName": "Email", "field": "Email", "width": "140", "id": "Email" },
                    { "headerName": "Created Time", "field": "Created Time", "width": "200", "id": "Created Time", "type": "dateTime" },
                    { "headerName": "Kyc Status", "field": "Kyc Status", "width": "100", "id": "Kyc Status" },
                    { "headerName": "Referer Id", "field": "Referer Id", "width": "140", "id": "Referer Id" },
                    { "headerName": "Cutoff Left Pv", "field": "Cutoff Left Pv", "width": "140", "id": "Cutoff Left Pv" },
                    { "headerName": "Cutoff Right Pv", "field": "Cutoff Right Pv", "width": "140", "id": "Cutoff Right Pv" },
                    { "headerName": "Backup Left Pv", "field": "Backup Left Pv", "width": "140", "id": "Backup Left Pv" },
                    { "headerName": "Backup Right Pv", "field": "Backup Right Pv", "width": "140", "id": "Backup Right Pv" },
                    { "headerName": "Total Left Pv", "field": "Total Left Pv", "width": "140", "id": "Total Left Pv" },
                    { "headerName": "Total Right Pv", "field": "Total Right Pv", "width": "140", "id": "Total Right Pv" },
                    { "headerName": "Total Earnings", "field": "Total Earnings", "width": "140", "id": "Total Earnings" },
                    { "headerName": "Pairmatch Income", "field": "Pairmatch Income", "width": "140", "id": "Pairmatch Income" },
                    { "headerName": "Sp Income", "field": "Sp Income", "width": "140", "id": "Sp Income" },
                    { "headerName": "Immediate Upline Id No", "field": "Immediate Upline Id No", "width": "140", "id": "Immediate Upline Id No" },
                    { "headerName": "Aadhar Number", "field": "Aadhar Number", "width": "140", "id": "Aadhar Number" },
                    { "headerName": "Pan Number", "field": "Pan Number", "width": "140", "id": "Pan Number" },
                    { "headerName": "Bank Account", "field": "Bank Account", "width": "140", "id": "Bank Account" },
                    { "headerName": "IFSc Code", "field": "IFSc Code", "width": "140", "id": "IFSc Code" }
                ]}
            />
        </Stack>
    )
}
export default DistributorList;