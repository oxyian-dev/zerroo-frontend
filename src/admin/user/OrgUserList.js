import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { IconEdit } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../components/ServerDataGrid";

const OrgUserList = () => {
    const render = [
        ({ value }) => (
            <IconButton component={Link} to={`/admin/org-users/${value}/edit`}>
                <IconEdit />
            </IconButton>
        ),
    ]

    const datatype = []
    datatype[2] = 'email'

    const width = [
        100,
        200,
        250,
        200
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Organization Users</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                datatype={datatype}
                render={render}
                width={width}
                ajax={{ url: '/api/admin/users/org-users' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
                    { "headerName": "Email", "field": "Email", "width": "250", "id": "Email" },
                    { "headerName": "Roles", "field": "Roles", "width": "200", "id": "Roles" },
                ]}
            />
        </Stack>
    )
}

export default OrgUserList;