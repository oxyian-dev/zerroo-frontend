import { Card, CardActionArea, CardContent, Grid, Paper, Typography } from "@mui/material"
import { blue, cyan, lime, orange, pink, purple, teal } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import fetcher from "../utils/fetcher"
import { inr, todayEnd, todayStart } from "../utils/util"

const Dashboard = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        fetcher('/api/admin/dashboard')
            .then(r => r.json())
            .then(setData)
    }, [])



    return (

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="caption" fontSize={{ md: 24, xs: 16 }}>Welcome</Typography>
                <Typography fontWeight={700} fontSize={{ md: 32, xs: 18 }}>Zerroo Admin</Typography>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: blue[200] }}>
                        <CardActionArea LinkComponent={Link} to={`/admin/distributors?filterColumn=Created%20Time&filterColumn=Created%20Time&filterOperator=onOrAfter&filterOperator=onOrBefore&filterValue=${todayStart()}&filterValue=${todayEnd()}`}>
                            <CardContent>
                                <Typography variant="h2" mb={4}>{data?.today || 0}</Typography>
                                <Typography variant="h5">Today's Joinee</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: "grey.300" }}>
                        <CardActionArea LinkComponent={Link} to="/admin/wallet-requests/pending">
                            <CardContent>
                                <Typography variant="h2" mb={4}>{data?.pending_wallets || 0}</Typography>
                                <Typography variant="h5">Pending Wallets</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: "warning.main" }}>
                        <CardActionArea LinkComponent={Link} to="/admin/kyc/pending">
                            <CardContent>
                                <Typography variant="h2" mb={4}>{data?.pending_kyc || 0}</Typography>
                                <Typography variant="h5">Pending KYC</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: "warning.light" }}>
                        <CardActionArea LinkComponent={Link} to="/admin/bank/pending">
                            <CardContent>
                                <Typography variant="h2" mb={4}>{data?.pending_bank || 0}</Typography>
                                <Typography variant="h5">Pending Bank</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: "success.light" }}>
                        <CardActionArea LinkComponent={Link} to="/admin/sale-orders/un-shipped">
                            <CardContent>
                                <Typography variant="h2" mb={4}>{data?.unshipped_sale_orders || 0}</Typography>
                                <Typography variant="h5">Unshipped Sale Orders</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: "error.light" }}>
                        <CardActionArea LinkComponent={Link} to="/admin/shipments/pending">
                            <CardContent>
                                <Typography variant="h2" mb={4}>{data?.pending_shipments || 0}</Typography>
                                <Typography variant="h5">Pending Shipments</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: cyan[200] }}>
                        <CardContent>
                            <Typography variant="h2" mb={4}>₹{inr(data?.revenue_today) || 0}</Typography>
                            <Typography variant="h5">Revenue Today</Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: teal[200] }}>
                        <CardContent>
                            <Typography variant="h2" mb={4}>₹{inr(data?.revenue_month) || 0}</Typography>
                            <Typography variant="h5">Revenue This Month</Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: purple[200] }}>
                        <CardContent>
                            <Typography variant="h2" mb={4}>₹{inr(data?.income_wallet) || 0}</Typography>
                            <Typography variant="h5">Income Wallet</Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: lime[200] }}>
                        <CardContent>
                            <Typography variant="h2" mb={4}>₹{inr(data?.purchase_wallet) || 0}</Typography>
                            <Typography variant="h5">Purchase Wallet</Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: orange[200] }}>
                        <CardContent>
                            <Typography variant="h2" mb={4}>₹{inr(data?.payouts) || 0}</Typography>
                            <Typography variant="h5">Payouts</Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Paper elevation={2}>
                    <Card sx={{ backgroundColor: pink[200] }}>
                        <CardContent>
                            <Typography variant="h2" mb={4}>₹{inr(data?.revenue_lifetime) || 0}</Typography>
                            <Typography variant="h5">Revenue Lifetime</Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>

    )
}
export default Dashboard