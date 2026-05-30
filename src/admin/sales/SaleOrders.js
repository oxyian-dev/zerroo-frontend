import { Box, Chip, Link } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-premium";
import { useCallback, useEffect, useState } from "react";
import { Link as Route } from "react-router-dom";
import ServerDataGrid from "../../components/ServerDataGrid";
import SaleOrderDetails from "./SaleOrderDetails";

const SaleOrders = () => {
    const datatype = ['dateTime', null, 'username']
    const render = []
    render[1] = ({ value, id }) => <Link component={Route} to={`/admin/sale-orders/${id}`}>{value}</Link>
    render[4] = ({ value }) => {
        if (value === 'Un Shipped') {
            return <Chip label={value} color="error" />
        } else if (value === 'Shipped') {
            return <Chip label={value} color="success" />
        } else {
            <Chip label={value} />
        }
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
        null,
        130,
        150,
        null,
        150,
        120
    ]

    return (
        <ServerDataGrid
            width={width}
            datatype={datatype}
            render={render}
            ajax={{ url: '/api/sale-orders' }}
            componentsProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500, autoFocus: true }
                }
            }}
            getDetailPanelContent={({ row }) => <ListDetailComponent row={row} />}
            getDetailPanelHeight={() => 'auto'}
            columns={[
                { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                { "headerName": "Order Id", "field": "Order Id", "width": "130", "id": "Order Id" },
                { "headerName": "ZID", "field": "ZID", "width": "150", "id": "ZID" },
                { "headerName": "Customer", "field": "Customer", "width": "200", "id": "Customer" },
                { "headerName": "Status", "field": "Status", "width": "150", "id": "Status" },
                { "headerName": "Price", "field": "Price", "width": "100", "id": "Price", "type": "number" },
                { "headerName": "PV", "field": "PV", "width": "120", "id": "PV", "type": "number" }
            ]}
            experimentalFeatures={{ aggregation: true }}
            aggregation={{
                model: {
                    "Price": "sum",
                    "PV" : "sum"
                },
            }}
        />
    )
}
export default SaleOrders
