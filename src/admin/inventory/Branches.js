import { Card, CardContent, Stack, Typography } from "@mui/material";
import ServerDataGrid from "../../components/ServerDataGrid";

const Branches = () => {
    const width = [];
    width[0] = 100;

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Branches</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                width={width}
                ajax={{ url: "/api/branches" }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action", "type": "number" },
                    { "headerName": "Branch", "field": "Branch", "width": "200", "id": "Branch" },
                    { "headerName": "Source", "field": "Source", "width": "200", "id": "Source" },
                    { "headerName": "City", "field": "City", "width": "200", "id": "City" },
                    { "headerName": "State", "field": "State", "width": "200", "id": "State" },
                    { "headerName": "GSTIN", "field": "GSTIN", "width": "200", "id": "GSTIN" }
                ]}
            />
        </Stack>
    );
};

export default Branches;
