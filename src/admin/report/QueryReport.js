import { LoadingButton } from "@mui/lab";
import { Paper, Stack, TextField, Typography } from "@mui/material";
import { DataGridPremium, GridToolbar } from "@mui/x-data-grid-premium";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";

const QueryReport = () => {
    const [query, setQuery] = useState('')
    const [executeQuery, setExecuteQuery] = useState(null)
    const initialData = {
        columns: [], rows: []
    };
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (executeQuery) {
            setLoading(true)
            const body = new FormData()
            body.set('query', executeQuery);
            fetcher(`/api/reports/query`, { method: 'POST', body })
                .then(r => r.json())
                .then(res => {
                    setData(res)
                    if (res.status === "success") {
                        if (res.rows.length === 0) {
                            enqueueSnackbar("This query returns 0 rows", { variant: 'warning' })
                        } else {
                            enqueueSnackbar(`Query Executed. Rows: ${res.rows.length}. Columns: ${res.columns.length}`,
                                { variant: 'success' })
                        }
                    } else {
                        enqueueSnackbar(res.message || 'Error Occurred', { variant: 'error' })
                    }
                })
                .catch(() => {
                    setData({ columns: [], rows: [] })
                    enqueueSnackbar('Error Occurred', { variant: 'error' })
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [executeQuery])

    return (
        <Paper elevation={2} sx={{ p: 2 }}>
            <Stack spacing={2}>
                <Typography variant="h2" textAlign="center">Query Report</Typography>
                <TextField
                    required
                    multiline
                    rows={2}
                    label="Query"
                    value={query}
                    onChange={({ target }) => {
                        setQuery(target.value)
                    }}
                />
                <LoadingButton
                    disabled={!query || query === executeQuery}
                    loading={loading}
                    variant="contained"
                    onClick={() => {
                        setExecuteQuery(query)
                    }}>
                    Execute Query
                </LoadingButton>

                <DataGridPremium
                    pagination={true}
                    loading={loading}
                    columns={data.columns}
                    rows={data.rows}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    pageSize={10}
                    autoHeight={true}
                    components={{ Toolbar: GridToolbar }}
                    experimentalFeatures={{ excelExport: true }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500, autoFocus: true }
                        }
                    }}
                />
            </Stack>
        </Paper>
    )
}
export default QueryReport;