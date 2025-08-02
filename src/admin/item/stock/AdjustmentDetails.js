import ServerDataGrid from "../../../components/ServerDataGrid";
import { useParams } from "react-router-dom";
import { toDateTime, WorkDriveImage } from "../../../utils/util";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import fetcher from "../../../utils/fetcher";
import ClientDataGrid from "../../../components/ClientDataGrid";

const AdjustmentDetails = ({ id = useParams()['id'] }) => {
    const [details, setDetails] = useState({});
    useEffect(() => {
        fetcher(`/api/stocks/adjustment/${id}`)
            .then(r => r.json())
            .then(setDetails)
    }, [id])

    const render = [({ value }) => <WorkDriveImage auto='width' image={value} alt="" />]
    const filter = [false]
    const sortable = [false]
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" mb={2}>
                        Adjustment Details
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Adjustment By: {details.firstname}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Description: {details.description}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Reason: {details.reason}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Time: {toDateTime(details.time)}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Inventory: {details.inventory}
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
                    ajax={{ url: `/api/stocks/adjustment/${id}/items` }}
                    columns={[{ "headerName": "Image", "field": "Image", "width": "200", "id": "Image" },
                    { "headerName": "SKU", "field": "SKU", "width": "200", "id": "SKU" },
                    { "headerName": "Title", "field": "Title", "width": "200", "id": "Title" },
                    { "headerName": "Initial", "field": "Initial", "width": "200", "id": "Initial", "type": "number" },
                    { "headerName": "Final", "field": "Final", "width": "200", "id": "Final", "type": "number" },
                    { "headerName": "Adjustment", "field": "Adjustment", "width": "200", "id": "Adjustment", "type": "number" }]}
                />
            </Box>
        </Box>
    )
}
export default AdjustmentDetails;