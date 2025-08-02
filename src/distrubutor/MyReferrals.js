import { Card, CardContent, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as Route } from 'react-router-dom'
import ServerDataGrid from '../components/ServerDataGrid'

export default function MyReferrals() {
  const width = [
    150,
    200,
    200,
    130,
    100,
  ]

  const render = []
  render[0] = ({ value }) => <Link component={Route} to={`/dashboard/genealogy/${value}`}>{value}</Link>

  const datatype = [
    null,
    null,
    null,
    'phone',
    'number'
  ]

  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h2" textAlign="center">My Referrals</Typography>
        </CardContent>
      </Card>

      <ServerDataGrid
        width={width}
        render={render}
        datatype={datatype}
        ajax={{ url: '/api/distributors/my-referrals' }}
        columns={[
          { "headerName": "ZID", "field": "ZID", "width": "150", "id": "ZID" },
          { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
          { "headerName": "Lastname", "field": "Lastname", "width": "200", "id": "Lastname" },
          { "headerName": "Phone", "field": "Phone", "width": "130", "id": "Phone" },
          { "headerName": "PV", "field": "PV", "width": "100", "id": "PV", "type": "number" },
        ]}
      />
    </Stack>
  )
}
