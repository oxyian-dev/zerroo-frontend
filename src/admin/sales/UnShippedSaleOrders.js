import { Backdrop, Box, CircularProgress, IconButton, Link } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-premium";
import { IconPackgeExport } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { Link as Route, useNavigate } from "react-router-dom";
import ServerDataGrid from "../../components/ServerDataGrid";
import fetcher from "../../utils/fetcher";
import SaleOrderDetails from "./SaleOrderDetails";

const UnShippedSaleOrders = () => {
    const datatype = []
    datatype[1] = 'dateTime'
    datatype[3] = 'username'
    const render = []
    render[0] = ({ value }) => <IconButton onClick={() => { ship(value) }}><IconPackgeExport /></IconButton>
    render[2] = ({ value, id }) => <Link component={Route} to={`/admin/sale-orders/${id}`}>{value}</Link>

    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const ship = (id) => {
        setLoading(true)
        fetcher(`/api/sale-orders/${id}/ship`, { method: "post" })
            .then(r => r.json())
            .then(res => {
                if (res.status === 'success') {
                    enqueueSnackbar("Order Shipped", { variant: 'success' })
                    navigate('/admin/shipments/pending')
                } else {
                    enqueueSnackbar('Exception occurred', { variant: 'error' })
                }
                setLoading(false)
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
                setLoading(false)
            })

    }

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
                <SaleOrderDetails id={row.id} />
            </Box>
        )
    }, [])

    const width = [
        100,
        null,
        130,
        150,
        null,
        100,
        120
    ]

    return (
        <Box>
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: ({ zIndex }) => zIndex.drawer + 1 }}>
                <CircularProgress />
            </Backdrop>

            <ServerDataGrid
                width={width}
                datatype={datatype}
                render={render}
                ajax={{ url: '/api/sale-orders/un-shipped' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                getDetailPanelContent={({ row }) => <ListDetailComponent row={row} />}
                getDetailPanelHeight={() => 'auto'}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "Order Id", "field": "Order Id", "width": "130", "id": "Order Id" },
                    { "headerName": "ZID", "field": "ZID", "width": "150", "id": "ZID" },
                    { "headerName": "Customer", "field": "Customer", "width": "200", "id": "Customer" },
                    { "headerName": "Price", "field": "Price", "width": "100", "id": "Price", "type": "number" },
                    { "headerName": "Shipping Fee", "field": "Shipping Fee", "width": "100", "id": "Shipping Fee", "type": "number" },
                    { "headerName": "PV", "field": "PV", "width": "120", "id": "PV", "type": "number" }
                ]}
                experimentalFeatures={{ aggregation: true }}
                aggregation={{
                    model: {
                        "Price": "sum",
                        "Shipping Fee": "sum",
                        "PV" :"sum"
                    },
                }}
            />
        </Box>
    )
}
export default UnShippedSaleOrders