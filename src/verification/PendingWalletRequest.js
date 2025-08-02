import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { IconList } from '@tabler/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import ServerDataGrid from '../components/ServerDataGrid'

export default function PendingWalletRequest() {

  const datatype = [
    null,
    'dateTime',
    'username',
    null,
    'number'
  ]

  const sortable = [
    false
  ]

  const filter = [false]

  const width = [
    100,
    200,
    150,
    200,
    100,
    200
  ]

  const render = [
    ({ value }) => <IconButton component={Link} to={`/admin/wallet-requests/${value}`}><IconList /></IconButton>
  ]

  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h2" textAlign="center">Pending Wallet Requests</Typography>
        </CardContent>
      </Card>

      <ServerDataGrid
        datatype={datatype}
        sortable={sortable}
        filter={filter}
        width={width}
        render={render}
        ajax={{ url: '/api/verification/wallet/pending' }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500, autoFocus: true }
          }
        }}
        columns={[
          { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
          { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
          { "headerName": "ZID", "field": "ZID", "width": "150", "id": "ZID" },
          { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
          { "headerName": "Amount", "field": "Amount", "width": "100", "id": "Amount", "type": "number" },
          { "headerName": "Transaction Id", "field": "Transaction Id", "width": "200", "id": "Transaction Id" }
        ]}
      />
    </Stack>
  )
}
