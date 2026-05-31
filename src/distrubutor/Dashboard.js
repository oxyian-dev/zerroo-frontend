import { Box, Card, CardActionArea, CardContent, Grid, IconButton, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
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

// Design System Styles
const cardStyles = {
  background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
  border: '1px solid rgba(255,255,255,.08)',
  backdropFilter: 'blur(10px)',
  borderRadius: '4px',
  transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(221,180,93,.3)',
    boxShadow: '0 20px 50px rgba(0,0,0,.5)'
  }
};

const statCardStyles = {
  ...cardStyles,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-80px',
    right: '-80px',
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(221,180,93,.12), transparent 70%)',
    transition: 'all 0.45s ease'
  },
  '&:hover::before': {
    transform: 'scale(1.2)',
    opacity: 0.8
  }
};

const welcomeCardStyles = {
  background: 'linear-gradient(135deg, rgba(239,203,119,.15) 0%, rgba(239,203,119,.05) 100%)',
  border: '2px solid rgba(239,203,119,.3)',
  backdropFilter: 'blur(10px)',
  borderRadius: '8px',
  mb: 3
};



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
              elevation={0}
              sx={welcomeCardStyles}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, padding: { md: 4, xs: 3 } }}>
                <div className="party-pop" />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#efcb77',
                    fontSize: { md: '2rem', xs: '1.5rem' },
                    letterSpacing: '-0.02em'
                  }}
                >
                  🎉 Welcome to the Distributor Dashboard! 🎉
                </Typography>
                <div className="party-pop" />
              </Box>
              <style>{`
                .party-pop {
                  width: 24px;
                  height: 24px;
                  background: linear-gradient(135deg, #efcb77, #ddb45d);
                  border-radius: 50%;
                  animation: pop 0.5s alternate infinite;
                  box-shadow: 0px 0px 15px rgba(239,203,119, 0.5);
                }
                @keyframes pop {
                  0% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                  100% { transform: translateY(0); }
                }
              `}</style>
            </Paper>
          )}
          <Grid container spacing={{ md: 3, xs: 2 }}>
            <Grid item md={6} xs={12}>
              <Typography
                variant="caption"
                sx={{
                  fontSize: { md: '1.5rem', xs: '1rem' },
                  color: 'rgba(255,255,255,.68)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontWeight: 600
                }}
              >
                Welcome
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { md: '2.5rem', xs: '1.5rem' },
                  color: 'white',
                  letterSpacing: '-0.02em',
                  mt: 0.5
                }}
              >
                {getName()}
              </Typography>
              {data ? (
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: { md: '1.25rem', xs: '1rem' },
                    color: '#efcb77',
                    mt: 0.5
                  }}
                >
                  {data.rank}
                </Typography>
              ) : (
                <Skeleton
                  sx={{
                    bgcolor: 'rgba(255,255,255,.1)',
                    fontSize: { md: '1.25rem', xs: '1rem' }
                  }}
                />
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              {data ? (
                data.created_time && (
                  <Typography
                    textAlign={{ md: "right" }}
                    sx={{
                      fontSize: { md: '1.125rem', xs: '0.95rem' },
                      color: 'rgba(255,255,255,.82)',
                      fontWeight: 500
                    }}
                  >
                    Member Since: <Box component="span" sx={{ color: '#efcb77', fontWeight: 600 }}>{toDateTime(data.created_time)}</Box>
                  </Typography>
                )
              ) : (
                <Skeleton
                  sx={{
                    bgcolor: 'rgba(255,255,255,.1)',
                    fontSize: { md: '1.125rem', xs: '0.95rem' }
                  }}
                />
              )}
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={0} sx={statCardStyles}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography
                    mb={1}
                    sx={{
                      color: 'rgba(255,255,255,.68)',
                      fontSize: { md: '0.95rem', xs: '0.85rem' },
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Current Cutoff Income (Qualification + 1:1 Pair)
                  </Typography>
                  {data ? (
                    <Typography
                      sx={{
                        fontSize: { md: '1.75rem', xs: '1.25rem' },
                        fontWeight: 700,
                        color: '#efcb77'
                      }}
                    >
                      ₹{inr(data.current_cutoff_income)}
                    </Typography>
                  ) : (
                    <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)', fontSize: { md: '1.75rem', xs: '1.25rem' } }} />
                  )}
                </Box>
                <Box position="absolute" top={8} right={8}>
                  <Tooltip title="Qualification income plus 1:1 pair income recorded in the latest cutoff window" arrow>
                    <IconButton
                      size="small"
                      sx={{
                        color: 'rgba(255,255,255,.68)',
                        '&:hover': { color: '#efcb77' }
                      }}
                    >
                      <IconQuestionCircle size={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={0} sx={statCardStyles}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography
                    mb={1}
                    sx={{
                      color: 'rgba(255,255,255,.68)',
                      fontSize: { md: '0.95rem', xs: '0.85rem' },
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Qualification Income (Lifetime Gross)
                  </Typography>
                  {data ? (
                    <Typography
                      sx={{
                        fontSize: { md: '1.75rem', xs: '1.25rem' },
                        fontWeight: 700,
                        color: '#efcb77'
                      }}
                    >
                      ₹{inr(data.qualification_income_lifetime)}
                    </Typography>
                  ) : (
                    <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)', fontSize: { md: '1.75rem', xs: '1.25rem' } }} />
                  )}
                </Box>
                <Box position="absolute" top={8} right={8}>
                  <Tooltip title="Initial 2:1 qualification payout before 1:1 pairing begins" arrow>
                    <IconButton
                      size="small"
                      sx={{
                        color: 'rgba(255,255,255,.68)',
                        '&:hover': { color: '#efcb77' }
                      }}
                    >
                      <IconQuestionCircle size={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={0} sx={statCardStyles}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography
                    mb={1}
                    sx={{
                      color: 'rgba(255,255,255,.68)',
                      fontSize: { md: '0.95rem', xs: '0.85rem' },
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Total Purchase Amount
                  </Typography>
                  {data ? (
                    <Typography
                      sx={{
                        fontSize: { md: '1.75rem', xs: '1.25rem' },
                        fontWeight: 700,
                        color: '#efcb77'
                      }}
                    >
                      ₹{inr(data.total_purchase ?? 0)}
                    </Typography>
                  ) : (
                    <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)', fontSize: { md: '1.75rem', xs: '1.25rem' } }} />
                  )}
                </Box>
                <Box position="absolute" top={8} right={8}>
                  <Tooltip title="Total amount from your completed purchase orders" arrow>
                    <IconButton
                      size="small"
                      sx={{
                        color: 'rgba(255,255,255,.68)',
                        '&:hover': { color: '#efcb77' }
                      }}
                    >
                      <IconQuestionCircle size={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={0} sx={statCardStyles}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography
                    mb={1}
                    sx={{
                      color: 'rgba(255,255,255,.68)',
                      fontSize: { md: '0.95rem', xs: '0.85rem' },
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Self PV
                  </Typography>
                  {data ? (
                    <Typography
                      sx={{
                        fontSize: { md: '1.75rem', xs: '1.25rem' },
                        fontWeight: 700,
                        color: '#efcb77'
                      }}
                    >
                      {inr(data.self_pv)} PV
                    </Typography>
                  ) : (
                    <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)', fontSize: { md: '1.75rem', xs: '1.25rem' } }} />
                  )}
                </Box>
                <Box position="absolute" top={8} right={8}>
                  <Tooltip title="Self Purchased product's PV" arrow>
                    <IconButton
                      size="small"
                      sx={{
                        color: 'rgba(255,255,255,.68)',
                        '&:hover': { color: '#efcb77' }
                      }}
                    >
                      <IconQuestionCircle size={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={0} sx={statCardStyles}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography
                    mb={1}
                    sx={{
                      color: 'rgba(255,255,255,.68)',
                      fontSize: { md: '0.95rem', xs: '0.85rem' },
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Total Earnings (Gross)
                  </Typography>
                  {data ? (
                    <Typography
                      sx={{
                        fontSize: { md: '1.75rem', xs: '1.25rem' },
                        fontWeight: 700,
                        color: '#efcb77'
                      }}
                    >
                      ₹{inr(data.total_income)}
                    </Typography>
                  ) : (
                    <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)', fontSize: { md: '1.75rem', xs: '1.25rem' } }} />
                  )}
                </Box>
                <Box position="absolute" top={8} right={8}>
                      <Tooltip title="Gross lifetime earnings before deductions" arrow>
                    <IconButton
                      size="small"
                      sx={{
                        color: 'rgba(255,255,255,.68)',
                        '&:hover': { color: '#efcb77' }
                      }}
                    >
                      <IconQuestionCircle size={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={0} sx={statCardStyles}>
                <Box p={{ md: 4, xs: 2 }}>
                  <Typography
                    mb={1}
                    sx={{
                      color: 'rgba(255,255,255,.68)',
                      fontSize: { md: '0.95rem', xs: '0.85rem' },
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    1:1 Pair Match Income (Lifetime Gross)
                  </Typography>
                  {data ? (
                    <Typography
                      sx={{
                        fontSize: { md: '1.75rem', xs: '1.25rem' },
                        fontWeight: 700,
                        color: '#efcb77'
                      }}
                    >
                      ₹{inr(data.pair_match_income_lifetime ?? data.pair_match_income)}
                    </Typography>
                  ) : (
                    <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)', fontSize: { md: '1.75rem', xs: '1.25rem' } }} />
                  )}
                </Box>
                <Box position="absolute" top={8} right={8}>
                  <Tooltip title="1:1 pair match after the initial 2:1 qualification payout" arrow>
                    <IconButton
                      size="small"
                      sx={{
                        color: 'rgba(255,255,255,.68)',
                        '&:hover': { color: '#efcb77' }
                      }}
                    >
                      <IconQuestionCircle size={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={0} sx={statCardStyles}>
                <CardActionArea
                  component={Link}
                  to="transactions/income"
                  sx={{
                    '&:hover': {
                      '& .MuiTypography-root': {
                        color: '#efcb77'
                      }
                    }
                  }}
                >
                  <Box p={{ md: 4, xs: 2 }}>
                    <Typography
                      mb={1}
                      sx={{
                        color: 'rgba(255,255,255,.68)',
                        fontSize: { md: '0.95rem', xs: '0.85rem' },
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      Income Wallet (Net)
                    </Typography>
                    {data ? (
                      <Typography
                        sx={{
                          fontSize: { md: '1.75rem', xs: '1.25rem' },
                          fontWeight: 700,
                          color: '#efcb77',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        ₹{inr(data.income_wallet)}
                      </Typography>
                    ) : (
                      <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)', fontSize: { md: '1.75rem', xs: '1.25rem' } }} />
                    )}
                  </Box>
                  <Box position="absolute" top={8} right={8}>
                      <Tooltip title="Net wallet balance after deductions, available for payout" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          color: 'rgba(255,255,255,.68)',
                          '&:hover': { color: '#efcb77' }
                        }}
                      >
                        <IconQuestionCircle size={20} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={0} sx={statCardStyles}>
                <CardActionArea
                  component={Link}
                  to="transactions/purchase"
                  sx={{
                    '&:hover': {
                      '& .MuiTypography-root': {
                        color: '#efcb77'
                      }
                    }
                  }}
                >
                  <Box p={{ md: 4, xs: 2 }}>
                    <Typography
                      mb={1}
                      sx={{
                        color: 'rgba(255,255,255,.68)',
                        fontSize: { md: '0.95rem', xs: '0.85rem' },
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      Purchase Wallet
                    </Typography>
                    {data ? (
                      <Typography
                        sx={{
                          fontSize: { md: '1.75rem', xs: '1.25rem' },
                          fontWeight: 700,
                          color: '#efcb77',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        ₹{inr(data.purchase_wallet)}
                      </Typography>
                    ) : (
                      <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)', fontSize: { md: '1.75rem', xs: '1.25rem' } }} />
                    )}
                  </Box>
                  <Box position="absolute" top={8} right={8}>
                    <Tooltip title="Use this amount to purchase from the Store" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          color: 'rgba(255,255,255,.68)',
                          '&:hover': { color: '#efcb77' }
                        }}
                      >
                        <IconQuestionCircle size={20} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={6} md={4}>
              <Card elevation={0} sx={statCardStyles}>
                <CardActionArea
                  component={Link}
                  to="my-referrals"
                  sx={{
                    '&:hover': {
                      '& .MuiTypography-root': {
                        color: '#efcb77'
                      }
                    }
                  }}
                >
                  <Box p={{ md: 4, xs: 2 }}>
                    <Typography
                      mb={1}
                      sx={{
                        color: 'rgba(255,255,255,.68)',
                        fontSize: { md: '0.95rem', xs: '0.85rem' },
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      Direct Members
                    </Typography>
                    {data ? (
                      <Typography
                        sx={{
                          fontSize: { md: '1.75rem', xs: '1.25rem' },
                          fontWeight: 700,
                          color: '#efcb77',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {data.direct_members}
                      </Typography>
                    ) : (
                      <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)', fontSize: { md: '1.75rem', xs: '1.25rem' } }} />
                    )}
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={cardStyles}>
                <Box p={{ md: 4, xs: 3 }} display="flex" justifyContent="space-between">
                  <Stack spacing={1.5}>
                    <Typography
                      fontSize={{ md: '0.875rem', xs: '0.75rem' }}
                      fontWeight={700}
                      sx={{ color: 'rgba(255,255,255,.68)' }}
                    >
                      &nbsp;
                    </Typography>
                    <Typography
                      fontSize={{ md: '0.875rem', xs: '0.75rem' }}
                      fontWeight={700}
                      sx={{
                        color: 'rgba(255,255,255,.82)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      CUTOFF
                    </Typography>
                    <Typography
                      fontSize={{ md: '0.875rem', xs: '0.75rem' }}
                      fontWeight={700}
                      sx={{
                        color: 'rgba(255,255,255,.82)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      BALANCE
                    </Typography>
                    <Typography
                      fontSize={{ md: '0.875rem', xs: '0.75rem' }}
                      fontWeight={700}
                      sx={{
                        color: 'rgba(255,255,255,.82)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      TOTAL
                    </Typography>
                  </Stack>
                  <Stack spacing={1.5}>
                    <Typography
                      fontSize={{ md: '0.875rem', xs: '0.75rem' }}
                      fontWeight={700}
                      sx={{
                        color: '#efcb77',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      LEFT
                    </Typography>
                    {data ? (
                      <React.Fragment>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{inr(data.cutoff_left_pv)}</Typography>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{inr(data.carry_left_pv)}</Typography>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{inr(data.total_left_pv)}</Typography>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)' }} />
                        <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)' }} />
                        <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)' }} />
                      </React.Fragment>
                    )}
                  </Stack>
                  <Stack spacing={1.5}>
                    <Typography
                      fontSize={{ md: '0.875rem', xs: '0.75rem' }}
                      fontWeight={700}
                      sx={{
                        color: '#efcb77',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      RIGHT
                    </Typography>
                    {data ? (
                      <React.Fragment>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{inr(data.cutoff_right_pv)}</Typography>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{inr(data.carry_right_pv)}</Typography>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{inr(data.total_right_pv)}</Typography>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)' }} />
                        <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)' }} />
                        <Skeleton sx={{ bgcolor: 'rgba(255,255,255,.1)' }} />
                      </React.Fragment>
                    )}
                  </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card elevation={0} sx={{ ...cardStyles, flex: 1 }}>
                <CardContent sx={{ p: { md: 3, xs: 2 } }}>
                  <CutoffGraph />
                </CardContent>
              </Card>
            </Grid>
            {false && (
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ ...cardStyles, flex: 1 }}>
                  <CardContent sx={{ p: { md: 3, xs: 2 } }}>
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
