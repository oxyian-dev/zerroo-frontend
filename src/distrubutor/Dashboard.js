import { Box, Card, CardActionArea, CardContent, Grid, IconButton, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { amber, blue, green, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';
import { IconQuestionCircle } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getName } from '../auth/AuthProvider';
import fetcher from '../utils/fetcher';
import { inr, toDateTime } from '../utils/util';
import DeclarationForm from './DeclarationForm';
import Loader from '../components/Loader';
import CutoffGraph from './CutoffGraph';
import MonthlyGraph from './MonthlyGraph';



export default function Dashboard() {
  const [data, setData] = useState(null);
  const [hasAcceptedDeclaration, setHasAcceptedDeclaration] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    fetcher('/api/distributors/dashboard')
      .then(r => r.json())
      .then(setData)
  }, [])

  useEffect(() => {
    fetcher('/api/distributors/declaration-status')
      .then((r) => r.json())
      .then((status) => {
        setHasAcceptedDeclaration(status.declaration_status);
      });
  }, []);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  if (hasAcceptedDeclaration === null) {
    return <Loader />
  }

  return (
    <Box position="relative">
      {!hasAcceptedDeclaration ? (
        <DeclarationForm setHasAcceptedDeclaration={() => {
          setHasAcceptedDeclaration(true);
          setShowWelcome(true);
        }} />
      ) : (
        <>
          {showWelcome && (
            <Paper
              elevation={4}
              sx={{
                position: 'relative',
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#fff7e0',
                border: '2px solid #FFD700',
                borderRadius: '12px',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, padding: 2 }}>
                <div className="party-pop" />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF5733' }}>
                  🎉 Welcome to the Distributor Dashboard! 🎉
                </Typography>
                <div className="party-pop" />
              </Box>
              <style>{`
                .party-pop {
                  width: 24px;
                  height: 24px;
                  background-color: #FF5733;
                  border-radius: 50%;
                  animation: pop 0.5s alternate infinite;
                  box-shadow: 0px 0px 10px rgba(255, 87, 51, 0.5);
                }
                @keyframes pop {
                  0% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                  100% { transform: translateY(0); }
                }
              `}</style>
            </Paper>
          )}
          <Grid container spacing={{ md: 2, xs: 1.5 }}>
            <Grid item md={6} xs={12}>
              <Typography variant="caption" fontSize={{ md: 24, xs: 16 }}>Welcome</Typography>
              <Typography fontWeight={700} fontSize={{ md: 32, xs: 18 }}>{getName()}</Typography>
              {data ? (
                <Typography fontWeight={700} fontSize={{ md: 22, xs: 14 }}>{data.rank}</Typography>
              ) : (
                <Skeleton fontSize={{ md: 22, xs: 14 }}></Skeleton>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              {data ? (
                data.created_time && (
                  <Typography textAlign={{ md: "right" }} fontSize={{ md: 18, xs: 14 }}>Member Since: {toDateTime(data.created_time)}</Typography>
                )
              ) : (
                <Skeleton fontSize={{ md: 22, xs: 14 }}></Skeleton>
              )}
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={2} sx={{ bgcolor: yellow[100], position: "relative" }}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography mb={1}>Total Purchase Amount</Typography>
                  {data ? (
                    <Typography fontSize={{ md: 22, xs: 18 }} variant="h2">₹{inr(data.total_purchase)}</Typography>
                  ) : (
                    <Skeleton fontSize={{ md: 22, xs: 18 }} variant="text"></Skeleton>
                  )}
                </Box>
                <Box position="absolute" top={0} right={0}>
                  <Tooltip title="Total amount you've purchased so far">
                    <IconButton>
                      <IconQuestionCircle />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={2} sx={{ bgcolor: pink[200], position: "relative" }}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography mb={1}>Self PV</Typography>
                  {data ? (
                    <Typography fontSize={{ md: 22, xs: 18 }} variant="h2">{inr(data.self_pv)} PV</Typography>
                  ) : (
                    <Skeleton fontSize={{ md: 22, xs: 18 }} variant="text"></Skeleton>
                  )}
                </Box>
                <Box position="absolute" top={0} right={0}>
                  <Tooltip title="Self Purchased product's PV">
                    <IconButton>
                      <IconQuestionCircle />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={2} sx={{ bgcolor: purple[200], position: "relative" }}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography mb={1}>Self Purchase Sp</Typography>
                  {data ? (
                    <Typography fontSize={{ md: 22, xs: 18 }} variant="h2">{inr(data.sp_pv)} SP</Typography>
                  ) : (
                    <Skeleton fontSize={{ md: 22, xs: 18 }} variant="text"></Skeleton>
                  )}
                </Box>
                <Box position="absolute" top={0} right={0}>
                  <Tooltip title="Self Purchased product's SP">
                    <IconButton>
                      <IconQuestionCircle />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>


            <Grid item xs={6} md={4}>
              <Card elevation={2} sx={{ bgcolor: teal[100], position: "relative" }}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography mb={1}>Total Earnings</Typography>
                  {data ? (
                    <Typography fontSize={{ md: 22, xs: 18 }} variant="h2">₹{inr(data.total_income)}</Typography>
                  ) : (
                    <Skeleton fontSize={{ md: 22, xs: 18 }} variant="text"></Skeleton>
                  )}
                </Box>
                <Box position="absolute" top={0} right={0}>
                  <Tooltip title="The amount credited in your account so far!">
                    <IconButton>
                      <IconQuestionCircle />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={2} sx={{ bgcolor: "grey.300" , position: "relative" }}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography mb={1}>Pair Match Income</Typography>
                  {data ? (
                    <Typography fontSize={{ md: 22, xs: 18 }} variant="h2">₹{inr(data.pair_match_income)}</Typography>
                  ) : (
                    <Skeleton fontSize={{ md: 22, xs: 18 }} variant="text"></Skeleton>
                  )}
                </Box>
                <Box position="absolute" top={0} right={0}>
                  <Tooltip title="Binary compensation plan 1:1 ratio">
                    <IconButton>
                      <IconQuestionCircle />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={2} sx={{ bgcolor: blue[200], position: "relative" }}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography mb={1}>Self Purchase Income</Typography>
                  {data ? (
                    <Typography fontSize={{ md: 22, xs: 18 }} variant="h2">₹{inr(data.sp_income)}</Typography>
                  ) : (
                    <Skeleton fontSize={{ md: 22, xs: 18 }} variant="text"></Skeleton>
                  )}
                </Box>
                <Box position="absolute" top={0} right={0}>
                  <Tooltip title="Self Purchased retail income">
                    <IconButton>
                      <IconQuestionCircle />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>



            <Grid item xs={6} md={4}>
              <Card elevation={2} sx={{ bgcolor: green[100], position: "relative" }}>
                <CardActionArea component={Link} to="transactions/income">
                  <Box p={{ md: 4, xs: 2 }}>
                    <Typography mb={1}>Income Wallet</Typography>
                    {data ? (
                      <Typography fontSize={{ md: 22, xs: 18 }} variant="h2">₹{inr(data.income_wallet)}</Typography>
                    ) : (
                      <Skeleton fontSize={{ md: 22, xs: 18 }}></Skeleton>
                    )}
                  </Box>
                  <Box position="absolute" top={0} right={0}>
                    <Tooltip title="The amount will be in your bank account asap!">
                      <IconButton>
                        <IconQuestionCircle />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={2} sx={{ bgcolor: orange[100], position: "relative" }}>
                <CardActionArea component={Link} to="transactions/purchase">
                  <Box p={{ md: 4, xs: 2 }}>
                    <Typography mb={1}>Purchase Wallet</Typography>
                    {data ? (
                      <Typography fontSize={{ md: 22, xs: 18 }} variant="h2">₹{inr(data.purchase_wallet)}</Typography>
                    ) : (
                      <Skeleton fontSize={{ md: 22, xs: 18 }}></Skeleton>
                    )}
                  </Box>
                  <Box position="absolute" top={0} right={0}>
                    <Tooltip title="Use this amount to purchase from the Store">
                      <IconButton>
                        <IconQuestionCircle />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={2} sx={{ bgcolor: red[100] }}>
                <CardActionArea component={Link} to="my-referrals">
                  <Box p={{ md: 4, xs: 2 }}>
                    <Typography mb={1}>Direct Members</Typography>
                    {data ? (
                      <Typography fontSize={{ md: 22, xs: 18 }} variant="h2">{data.direct_members}</Typography>
                    ) : (
                      <Skeleton fontSize={{ md: 22, xs: 18 }}></Skeleton>
                    )}
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{
                border: "1px solid #C4C4C4",
              }}>
                <Box p={4} display="flex" justifyContent="space-between">
                  <Stack spacing={1}>
                    <Typography fontSize={{ md: 14, xs: 12 }} fontWeight={700}>&nbsp;</Typography>
                    <Typography fontSize={{ md: 14, xs: 12 }} fontWeight={700}>CUTOFF</Typography>
                    <Typography fontSize={{ md: 14, xs: 12 }} fontWeight={700}>BALANCE</Typography>
                    <Typography fontSize={{ md: 14, xs: 12 }} fontWeight={700}>TOTAL</Typography>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography fontSize={{ md: 14, xs: 12 }} fontWeight={700}>LEFT</Typography>
                    {data ? (
                      <React.Fragment>
                        <Typography>{inr(data.cutoff_left_pv)}</Typography>
                        <Typography>{inr(data.carry_left_pv)}</Typography>
                        <Typography>{inr(data.total_left_pv)}</Typography>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Skeleton></Skeleton>
                        <Skeleton></Skeleton>
                        <Skeleton></Skeleton>
                      </React.Fragment>
                    )}

                  </Stack>
                  <Stack spacing={1}>
                    <Typography fontSize={{ md: 14, xs: 12 }} fontWeight={700}>RIGHT</Typography>
                    {data ? (
                      <React.Fragment>
                        <Typography>{inr(data.cutoff_right_pv)}</Typography>
                        <Typography>{inr(data.carry_right_pv)}</Typography>
                        <Typography>{inr(data.total_right_pv)}</Typography>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Skeleton></Skeleton>
                        <Skeleton></Skeleton>
                        <Skeleton></Skeleton>
                      </React.Fragment>
                    )}
                  </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card elevation={2} sx={{ flex: 1, bgcolor: "white" }}>
                <CardContent>
                  <CutoffGraph />
                </CardContent>
              </Card>
            </Grid>
            {false && (
              <Grid item xs={12} md={6} >
                <Card elevation={2} sx={{ flex: 1, bgcolor: "white" }}>
                  <CardContent>
                    <MonthlyGraph />
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Box>
  )

}
