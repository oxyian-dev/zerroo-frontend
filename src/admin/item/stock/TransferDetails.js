import {Box, Card, CardContent, Typography} from "@mui/material";
import {toDateTime, WorkDriveImage} from "../../../utils/util";
import ServerDataGrid from "../../../components/ServerDataGrid";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import fetcher from "../../../utils/fetcher";

const TransferDetails = () => {
    const [details, setDetails] = useState({});
    const {id} = useParams()
    useEffect(() => {
        fetcher(`/api/stocks/transfer/${id}`)
            .then(r => r.json())
            .then(setDetails)
    }, [id])

    const render = [({value}) => <WorkDriveImage auto='width' image={value} alt=""/>]
    const filter = [false]
    const sortable = [false]
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div" mb={2}>
                        Transfer Details
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Transfer By: {details.firstname}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Description: {details.description}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Reason: {details.reason}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Quantity: {details.quantity}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        Time: {toDateTime(details.time)}
                    </Typography>

                </CardContent>
            </Card>
            <Box mt={3}>
                <ServerDataGrid filter={filter} sortable={sortable} customize={{rowHeight: 150}} render={render}
                                client={true} ajax={{url: `/api/stocks/transfer/${id}/items`}}/>
            </Box>

        </Box>

    )

}
export default TransferDetails;