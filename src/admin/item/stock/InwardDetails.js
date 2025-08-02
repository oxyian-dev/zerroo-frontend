import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as Route, useParams } from "react-router-dom";
import ClientDataGrid from "../../../components/ClientDataGrid";
import fetcher from "../../../utils/fetcher";
import { toDateTime, WorkDriveImage } from "../../../utils/util";

const InwardDetails = ({ id = useParams()['id'] }) => {
    const [details, setDetails] = useState({});
    useEffect(() => {
        fetcher(`/api/stocks/inward/${id}`)
            .then(r => r.json())
            .then(setDetails)
    }, [id])

    const render = [
        ({ value }) => <WorkDriveImage auto='width' image={value} alt="" />,
        ({ value }) => <Link component={Route} to={`/admin/stocks?search=${value}`}>{value}</Link>
    ]
    const filter = [false]
    const sortable = [false]
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" mb={2}>
                        Inward Details
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Inward By: {details.firstname}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Description: {details.description}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Reference ID: {details.ref_id}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Time: {toDateTime(details.time)}
                    </Typography>

                </CardContent>
            </Card>
            <Box mt={3}>
                <ClientDataGrid
                    filter={filter}
                    sortable={sortable}
                    customize={{ rowHeight: 150 }}
                    render={render}
                    client={true}
                    ajax={{ url: `/api/stocks/inward/${id}/items` }}
                    columns={
                        [{ "headerName": "Image", "field": "Image", "width": "200", "id": "Image" },
                        { "headerName": "SKU", "field": "SKU", "width": "200", "id": "SKU" },
                        { "headerName": "Title", "field": "Title", "width": "200", "id": "Title" },
                        { "headerName": "Quantity", "field": "Quantity", "width": "200", "id": "Quantity", "type": "number" },
                        { "headerName": "Inventory", "field": "Inventory", "width": "200", "id": "Inventory" }]
                    }
                />
            </Box>
        </Box>

    )
}
export default InwardDetails;