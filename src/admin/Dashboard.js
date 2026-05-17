import { Card, CardActionArea, CardContent, Grid, Typography, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import fetcher from "../utils/fetcher"
import { inr, todayEnd, todayStart } from "../utils/util"

const accentColors = {
  gold: {
    bg: 'linear-gradient(135deg, rgba(255,247,220,.08), rgba(159,103,32,.05))',
    border: 'rgba(221,180,93,.3)',
    value: '#efcb77',
    label: 'rgba(255,255,255,.68)',
  },
  blue: {
    bg: 'linear-gradient(135deg, rgba(77,171,247,.08), rgba(77,171,247,.02))',
    border: 'rgba(77,171,247,.2)',
    value: '#4dabf7',
    label: 'rgba(255,255,255,.68)',
  },
  green: {
    bg: 'linear-gradient(135deg, rgba(81,207,102,.08), rgba(81,207,102,.02))',
    border: 'rgba(81,207,102,.2)',
    value: '#51cf66',
    label: 'rgba(255,255,255,.68)',
  },
  red: {
    bg: 'linear-gradient(135deg, rgba(255,107,107,.08), rgba(255,107,107,.02))',
    border: 'rgba(255,107,107,.2)',
    value: '#ff6b6b',
    label: 'rgba(255,255,255,.68)',
  },
  orange: {
    bg: 'linear-gradient(135deg, rgba(255,169,77,.08), rgba(255,169,77,.02))',
    border: 'rgba(255,169,77,.2)',
    value: '#ffa94d',
    label: 'rgba(255,255,255,.68)',
  },
  purple: {
    bg: 'linear-gradient(135deg, rgba(200,160,255,.08), rgba(200,160,255,.02))',
    border: 'rgba(200,160,255,.2)',
    value: '#c8a0ff',
    label: 'rgba(255,255,255,.68)',
  },
  teal: {
    bg: 'linear-gradient(135deg, rgba(77,220,200,.08), rgba(77,220,200,.02))',
    border: 'rgba(77,220,200,.2)',
    value: '#4ddcc8',
    label: 'rgba(255,255,255,.68)',
  },
  pink: {
    bg: 'linear-gradient(135deg, rgba(255,150,200,.08), rgba(255,150,200,.02))',
    border: 'rgba(255,150,200,.2)',
    value: '#ff96c8',
    label: 'rgba(255,255,255,.68)',
  },
}

const cards = [
  { key: 'today', label: "Today's Joinee", accent: 'gold', link: `/admin/distributors?filterColumn=Created%20Time&filterColumn=Created%20Time&filterOperator=onOrAfter&filterOperator=onOrBefore&filterValue=${todayStart()}&filterValue=${todayEnd()}`, isCurrency: false },
  { key: 'pending_wallets', label: 'Pending Wallets', accent: 'orange', link: '/admin/wallet-requests/pending', isCurrency: false },
  { key: 'pending_kyc', label: 'Pending KYC', accent: 'red', link: '/admin/kyc/pending', isCurrency: false },
  { key: 'pending_bank', label: 'Pending Bank', accent: 'orange', link: '/admin/bank/pending', isCurrency: false },
  { key: 'unshipped_sale_orders', label: 'Unshipped Sale Orders', accent: 'purple', link: '/admin/sale-orders/un-shipped', isCurrency: false },
  { key: 'pending_shipments', label: 'Pending Shipments', accent: 'red', link: '/admin/shipments/pending', isCurrency: false },
  { key: 'revenue_today', label: 'Revenue Today', accent: 'green', link: null, isCurrency: true },
  { key: 'revenue_month', label: 'Revenue This Month', accent: 'teal', link: null, isCurrency: true },
  { key: 'income_wallet', label: 'Income Wallet', accent: 'purple', link: null, isCurrency: true },
  { key: 'purchase_wallet', label: 'Purchase Wallet', accent: 'blue', link: null, isCurrency: true },
  { key: 'payouts', label: 'Payouts', accent: 'orange', link: null, isCurrency: true },
  { key: 'revenue_lifetime', label: 'Revenue Lifetime', accent: 'pink', link: null, isCurrency: true },
]

const Dashboard = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        fetcher('/api/admin/dashboard')
            .then(r => r.json())
            .then(setData)
    }, [])

    return (
        <Box>
            <Box mb={4}>
                <Typography variant="caption" sx={{ fontSize: { md: '1.05rem', xs: '0.95rem' }, color: 'rgba(255,255,255,.5)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Welcome</Typography>
                <Typography sx={{ fontWeight: 900, fontSize: { md: '2.5rem', xs: '1.5rem' }, color: '#fff', letterSpacing: '-0.02em' }}>Zerroo Admin</Typography>
            </Box>
            <Grid container spacing={2.5}>
                {cards.map(({ key, label, accent, link, isCurrency }) => {
                    const value = data?.[key]
                    const colors = accentColors[accent]
                    const displayValue = isCurrency ? `₹${inr(value) || 0}` : (value ?? 0)

                    const content = (
                        <Card
                            sx={{
                                background: colors.bg,
                                border: `1px solid ${colors.border}`,
                                backdropFilter: 'blur(10px)',
                                borderRadius: '4px',
                                transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                                height: '100%',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    borderColor: colors.border.replace('.2', '.3'),
                                    boxShadow: '0 25px 60px rgba(0,0,0,.4)',
                                }
                            }}
                        >
                            <CardContent sx={{ p: { md: '28px', xs: '20px' }, '&:last-child': { pb: { md: '28px', xs: '20px' } } }}>
                                <Typography sx={{ fontSize: { md: '2rem', xs: '1.5rem' }, fontWeight: 800, color: colors.value, mb: 2, letterSpacing: '-0.02em' }}>
                                    {displayValue}
                                </Typography>
                                <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: colors.label, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    {label}
                                </Typography>
                            </CardContent>
                        </Card>
                    )

                    return (
                        <Grid item lg={3} md={4} xs={12} key={key}>
                            {link ? (
                                <CardActionArea component={Link} to={link} sx={{ borderRadius: '4px', height: '100%' }}>
                                    {content}
                                </CardActionArea>
                            ) : content}
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
export default Dashboard
