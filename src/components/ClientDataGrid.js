import { Box } from "@mui/material";
import { DataGridPremium, GridToolbar } from "@mui/x-data-grid-premium";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { toDate, toDateTime } from "../utils/util";

const ClientDataGrid = ({
    ajax,
    customize,
    width,
    render,
    datatype,
    filter,
    sortable,
    columns = [],
    aggregation,
    refresh }) => {
    const [data, setData] = useState({
        rows: [],
        columns,
        rowCount: 0
    });
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setLoading(true)
        fetcher(ajax.url, {
            method: ajax.method || 'get'
        })
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.columns.length; i++) {
                    if (width?.[i]) {
                        data.columns[i].width = width[i]
                    }
                    if (render?.[i]) {
                        data.columns[i].renderCell = render[i]
                    }
                    if (datatype?.[i]) {
                        data.columns[i].type = datatype[i]
                        if (['dateTime', 'date'].indexOf(data.columns[i].type) > -1) {
                            data.rows.forEach(row => {
                                if (data.columns[i].type === 'dateTime') {
                                    row[data.columns[i].headerName] = toDateTime(row[data.columns[i].headerName])
                                } else if (data.columns[i].type === 'date') {
                                    row[data.columns[i].headerName] = toDate(row[data.columns[i].headerName])
                                }
                            })
                        }
                    }
                    if (filter?.[i] === false) {
                        data.columns[i].filterable = false
                    }
                    if (sortable?.[i] === false) {
                        data.columns[i].sortable = false
                    }
                }
                setData(data)
                setLoading(false)
            })
            .catch(() => {
                enqueueSnackbar('Exception occurred while loading data', { variant: 'error' })
                setLoading(false)
            })
    }, [refresh])

    return (
        <Box width="100%">
            <DataGridPremium
                sx={{ bgcolor: 'transparent' }}
                loading={loading}
                disableSelectionOnClick
                pagination={true}
                columns={data.columns}
                rows={data.rows}
                initialState={{
                    pagination: {
                        pageSize: 10
                    },
                    aggregation
                }}
                rowsPerPageOptions={[10, 20, 50, 100]}
                autoHeight={true}
                components={{ Toolbar: GridToolbar }}
                experimentalFeatures={{ excelExport: true }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                    }
                }}
                {...customize}
            />
        </Box>
    )
}

export default ClientDataGrid;