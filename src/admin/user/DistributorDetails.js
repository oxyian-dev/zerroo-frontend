import {
    Box,
    Chip,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from '@mui/material'
import {
    IconBuilding,
    IconBuildingBank,
    IconClock,
    IconDeviceMobile,
    IconEdit,
    IconId,
    IconIdBadge,
    IconIdBadge2,
    IconMail,
    IconMoodSmile,
    IconMoodSmileBeam,
    IconNumbers,
    IconSignLeft,
    IconSignRight,
    IconUserExclamation,
    IconX
} from '@tabler/icons'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ClientDataGrid from '../../components/ClientDataGrid'
import Loader from '../../components/Loader'
import fetcher from '../../utils/fetcher'
import { WorkDriveImage, inr, toDateTime, toImage } from '../../utils/util'

export default function DistributorDetails({ id = useParams()['id'] }) {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [reload, setReload] = useState(0)

    useEffect(() => {
        fetcher(`/api/admin/users/distributors/${id}`)
            .then(r => r.json())
            .then(res => {
                setData(res)
                setLoading(false)
            })
    }, [id, reload])

    const color = {
        "Rejected": "error",
        "Verified": "success",
        "Pending": "warning"
    }

    const removeAvatar = () => {
        fetcher(`/api/admin/users/distributors/${id}/avatar`, { method: 'delete' })
            .then(r => r.json())
            .then(({ status, message = 'Exception' }) => {
                if (status === 'success') {
                    enqueueSnackbar('Image removed', { variant: 'success' })
                    setReload(reload => reload + 1);
                } else {
                    enqueueSnackbar(message, { variant: 'warning' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
            })
    }

    const removeKyc = () => {
        fetcher(`/api/admin/users/distributors/${id}/kyc`, { method: 'delete' })
            .then(r => r.json())
            .then(({ status, message = 'Exception' }) => {
                if (status === 'success') {
                    enqueueSnackbar('KYC removed', { variant: 'success' })
                    setReload(reload => reload + 1);
                } else {
                    enqueueSnackbar(message, { variant: 'warning' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
            })
    }

    const removeBank = () => {
        fetcher(`/api/admin/users/distributors/${id}/bank`, { method: 'delete' })
            .then(r => r.json())
            .then(({ status, message = 'Exception' }) => {
                if (status === 'success') {
                    enqueueSnackbar('Bank removed', { variant: 'success' })
                    setReload(reload => reload + 1);
                } else {
                    enqueueSnackbar(message, { variant: 'warning' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
            })
    }

    return (
        loading ? (
            <Loader />
        ) : (
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography textAlign="center" variant='h2'>Distributor Details</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        {data.avatar && (
                            <Box textAlign="center">
                                <Box mx="auto" position="relative" width={200} height={200}>
                                    <img
                                        src={toImage(data.avatar)}
                                        alt="Error Image"
                                        style={{
                                            minWidth: 200,
                                            minHeight: 200,
                                            width: 200,
                                            height: 200,
                                            border: "0.25px solid #00000025",
                                            borderRadius: "50%"
                                        }} />
                                    <Box position="absolute" top={0} right={0}>
                                        <IconButton title='Remove Image' onClick={() => { removeAvatar() }}>
                                            <IconX />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography textAlign="center" variant='h4'>
                                KYC Verification <Chip label={data.kyc_verification_status || 'Not initiated'}
                                    color={color[data.kyc_verification_status]} />
                                {data.kyc_verification_status === 'Verified' && (
                                    <IconButton title='Remove KYC' onClick={() => { removeKyc() }}>
                                        <IconX />
                                    </IconButton>
                                )}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography textAlign="center" variant='h4'>
                                Bank Verification <Chip label={data.bank_verification_status || 'Not initiated'}
                                    color={color[data.bank_verification_status]} />
                                {data.bank_verification_status === 'Verified' && (
                                    <IconButton title='Remove Bank' onClick={() => { removeBank() }}>
                                        <IconX />
                                    </IconButton>
                                )}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography textAlign="center" variant='h4'>
                                PV <Chip label={data.self_pv} />
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography mb={2} textAlign="center" variant='h4'>
                                Basic Details <IconButton component={Link} to={`/admin/distributors/${id}/edit`}><IconEdit /></IconButton>
                            </Typography>
                            <Divider />
                            <List>
                                <Grid container>
                                    <Grid item md={4} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconId />
                                            </ListItemIcon>
                                            <ListItemText primary="ZID" secondary={data.username} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconMoodSmile />
                                            </ListItemIcon>
                                            <ListItemText primary="Name" secondary={`${data.firstname} ${data.lastname ? data.lastname : ''}`} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <ListItemButton component='a' href={`tel://${data.phone}`}>
                                            <ListItemIcon>
                                                <IconDeviceMobile />
                                            </ListItemIcon>
                                            <ListItemText primary="Phone" secondary={data.phone} />
                                        </ListItemButton>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <ListItemButton component='a' href={`mailto:${data.email}`}>
                                            <ListItemIcon>
                                                <IconMail />
                                            </ListItemIcon>
                                            <ListItemText title={data.email} secondaryTypographyProps={{
                                                noWrap: true
                                            }} primary="Email" secondary={data.email} />
                                        </ListItemButton>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <ListItemButton component={Link} to={`/admin/distributors?search=${data.referer_username}`}>
                                            <ListItemIcon>
                                                <IconUserExclamation />
                                            </ListItemIcon>
                                            <ListItemText primary="Referer" secondary={data.referer_username} />
                                        </ListItemButton>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconClock />
                                            </ListItemIcon>
                                            <ListItemText primary="Joined Time" secondary={toDateTime(data.created_time)} />
                                        </ListItem>
                                    </Grid>
                                </Grid>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography mb={2} textAlign="center" variant='h4'>
                                PV Details
                                <IconButton component={Link} to={`/admin/distributors/${id}/pv`}><IconEdit /></IconButton>
                            </Typography>
                            <Divider />
                            <List>
                                <Grid container>
                                    <Grid item md={6} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconSignLeft />
                                            </ListItemIcon>
                                            <ListItemText primary="Cutoff Left PV" secondary={inr(data.cutoff_left_pv)} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconSignRight />
                                            </ListItemIcon>
                                            <ListItemText primary="Cutoff Right PV" secondary={inr(data.cutoff_right_pv)} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconSignLeft />
                                            </ListItemIcon>
                                            <ListItemText primary="Backup Left PV" secondary={inr(data.carry_left_pv)} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconSignRight />
                                            </ListItemIcon>
                                            <ListItemText primary="Backup Right PV" secondary={inr(data.carry_right_pv)} />
                                        </ListItem>
                                    </Grid>
                                </Grid>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography mb={2} textAlign="center" variant='h4'>
                                KYC Details <IconButton component={Link} to={`/admin/distributors/${id}/kyc`}><IconEdit /></IconButton>
                            </Typography>
                            <Divider />
                            <List>
                                <Grid container>
                                    <Grid item md={6} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconIdBadge />
                                            </ListItemIcon>
                                            <ListItemText primary="Aadhaar" secondary={data.aadhaar || 'NA'} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconIdBadge2 />
                                            </ListItemIcon>
                                            <ListItemText primary="PAN" secondary={data.pan || 'NA'} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconMoodSmileBeam />
                                            </ListItemIcon>
                                            <ListItemText primary="Firstname" secondary={data.pan_firstname || 'NA'} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconMoodSmile />
                                            </ListItemIcon>
                                            <ListItemText primary="Lastname" secondary={data.pan_lastname || 'NA'} />
                                        </ListItem>
                                    </Grid>
                                </Grid>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography mb={2} textAlign="center" variant='h4'>
                                Bank Details <IconButton component={Link} to={`/admin/distributors/${id}/bank`}><IconEdit /></IconButton>
                            </Typography>
                            <Divider />
                            <List>
                                <Grid container>
                                    <Grid item md={4} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconBuilding />
                                            </ListItemIcon>
                                            <ListItemText primary="Bank" secondary={data.bank || 'NA'} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconBuildingBank />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Branch" secondary={data.branch || 'NA'} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconId />
                                            </ListItemIcon>
                                            <ListItemText primary="Account" secondary={data.account_no || 'NA'} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <IconNumbers />
                                            </ListItemIcon>
                                            <ListItemText primary="IFSC" secondary={data.ifsc || 'NA'} />
                                        </ListItem>
                                    </Grid>
                                </Grid>
                            </List>
                        </Paper>
                    </Grid>
                    {data.aadhaar_front_image && (
                        <Grid item md={6} xs={12}>
                            <Paper sx={{ p: 2 }} elevation={2}>
                                <Typography mb={2} textAlign="center" variant='h4'>Aadhaar Front</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <WorkDriveImage image={data.aadhaar_front_image} />
                            </Paper>
                        </Grid>
                    )}

                    {data.aadhaar_back_image && (
                        <Grid item md={6} xs={12}>
                            <Paper sx={{ p: 2 }} elevation={2}>
                                <Typography mb={2} textAlign="center" variant='h4'>Aadhaar Back</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <WorkDriveImage image={data.aadhaar_back_image} />
                            </Paper>
                        </Grid>
                    )}

                    {data.pan_image && (
                        <Grid item md={6} xs={12}>
                            <Paper sx={{ p: 2 }} elevation={2}>
                                <Typography mb={2} textAlign="center" variant='h4'>PAN</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <WorkDriveImage image={data.pan_image} />
                            </Paper>
                        </Grid>
                    )}

                    {data.bank_image && (
                        <Grid item md={6} xs={12}>
                            <Paper sx={{ p: 2 }} elevation={2}>
                                <Typography mb={2} textAlign="center" variant='h4'>Bank Image</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <WorkDriveImage image={data.bank_image} />
                            </Paper>
                        </Grid>
                    )}


                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography mb={2} textAlign="center" variant='h2'>
                                Purchase History
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <ClientDataGrid
                                ajax={{ url: `/api/sale-orders/distributors/${id}` }}
                                datatype={['dateTime']}
                                columns={[
                                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                                    { "headerName": "Order Id", "field": "Order Id", "width": "200", "id": "Order Id" },
                                    { "headerName": "Shipping Status", "field": "Shipping Status", "width": "200", "id": "Shipping Status" },
                                    { "headerName": "Price", "field": "Price", "width": "200", "id": "Price", "type": "number" },
                                    { "headerName": "PV", "field": "PV", "width": "200", "id": "PV", "type": "number" }
                                ]}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography mb={2} textAlign="center" variant='h2'>
                                Net Payout History
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <ClientDataGrid
                                ajax={{ url: `/api/payouts/distributors/${id}/entries` }}
                                experimentalFeatures={{ aggregation: true }}
                                aggregation={{
                                    model: {
                                        "Full Amount": "sum",
                                        "TDS Amount": "sum",
                                        "Admin Amount": "sum",
                                        "Actual Amount": "sum",
                                    },
                                }}
                                columns={[
                                    { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
                                    { "headerName": "Lastname", "field": "Lastname", "width": "200", "id": "Lastname" },
                                    { "headerName": "City", "field": "City", "width": "200", "id": "City" },
                                    { "headerName": "Account Number", "field": "Account Number", "width": "200", "id": "Account Number" },
                                    { "headerName": "IFSC", "field": "IFSC", "width": "200", "id": "IFSC" },
                                    { "headerName": "Bank", "field": "Bank", "width": "200", "id": "Bank" },
                                    { "headerName": "Branch", "field": "Branch", "width": "200", "id": "Branch" },
                                    { "headerName": "Full Amount (Gross)", "field": "Full Amount", "width": "200", "id": "Full Amount", "type": "number" },
                                    { "headerName": "TDS Amount", "field": "TDS Amount", "width": "200", "id": "TDS Amount", "type": "number" },
                                    { "headerName": "Admin Amount", "field": "Admin Amount", "width": "200", "id": "Admin Amount", "type": "number" },
                                    { "headerName": "Net Amount", "field": "Actual Amount", "width": "200", "id": "Actual Amount", "type": "number" }
                                ]}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography mb={2} textAlign="center" variant='h2'>
                                Purchase Wallet Transactions
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <ClientDataGrid
                                datatype={[
                                    'dateTime',
                                    'number',
                                    'number',
                                    'number',
                                ]}
                                ajax={{ url: `/api/wallet-statements/purchase/distributors/${id}` }}
                                columns={[
                                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                                    { "headerName": "Amount", "field": "Amount", "width": "200", "id": "Amount", "type": "number" },
                                    { "headerName": "Opening Amount", "field": "Opening Amount", "width": "200", "id": "Opening Amount", "type": "number" },
                                    { "headerName": "Closing Amount", "field": "Closing Amount", "width": "200", "id": "Closing Amount", "type": "number" },
                                    { "headerName": "Type", "field": "Type", "width": "200", "id": "Type" },
                                    { "headerName": "Remark", "field": "Remark", "width": "200", "id": "Remark" }
                                ]}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography mb={2} textAlign="center" variant='h2'>
                                Income Wallet Transactions (Net)
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <ClientDataGrid
                                datatype={[
                                    'dateTime',
                                    'number',
                                    'number',
                                    'number',
                                ]}
                                ajax={{ url: `/api/wallet-statements/income/distributors/${id}` }}
                                columns={[
                                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                                    { "headerName": "Amount", "field": "Amount", "width": "200", "id": "Amount", "type": "number" },
                                    { "headerName": "Opening Amount", "field": "Opening Amount", "width": "200", "id": "Opening Amount", "type": "number" },
                                    { "headerName": "Closing Amount", "field": "Closing Amount", "width": "200", "id": "Closing Amount", "type": "number" },
                                    { "headerName": "Type", "field": "Type", "width": "200", "id": "Type" },
                                    { "headerName": "Remark", "field": "Remark", "width": "200", "id": "Remark" }
                                ]}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography mb={2} textAlign="center" variant='h2'>
                                UPLINES
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <ClientDataGrid
                                ajax={{ url: `/api/admin/users/distributors/${id}/uplines` }}
                                columns={[
                                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                                    { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
                                    { "headerName": "Lastname", "field": "Lastname", "width": "200", "id": "Lastname" },
                                    { "headerName": "Rank", "field": "Rank", "width": "200", "id": "Rank" },
                                    { "headerName": "Placement", "field": "Placement", "width": "200", "id": "Placement" },
                                    { "headerName": "Phone", "field": "Phone", "width": "200", "id": "Phone" }
                                ]}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        ))
}
