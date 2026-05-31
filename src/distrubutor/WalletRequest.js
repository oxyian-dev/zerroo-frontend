import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, List, ListItem, ListItemIcon, ListItemText, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { IconBuilding, IconBuildingBank, IconCalendar, IconId, IconNumbers, IconUser } from '@tabler/icons';
import { Formik } from "formik";
import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import HionImageUpload from '../components/HionImageUpload';
import fetcher from '../utils/fetcher';
import REGEX from '../utils/regex';
import { constructFormData } from '../utils/util';

// Design System Styles
const formFieldStyles = {
  '& .MuiOutlinedInput-root': {
    color: 'white !important',
    backgroundColor: 'rgba(255,255,255,.02)',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,.08)',
      transition: 'border-color 0.3s ease'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255,255,255,.15)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#efcb77',
      borderWidth: '2px'
    },
    '& input': {
      color: 'white !important',
      WebkitTextFillColor: 'white !important',
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
        WebkitTextFillColor: 'white !important',
        caretColor: 'white !important',
        transition: 'background-color 5000s ease-in-out 0s'
      },
      '&:-webkit-autofill:hover': {
        WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
        WebkitTextFillColor: 'white !important'
      },
      '&:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
        WebkitTextFillColor: 'white !important'
      },
      '&:-webkit-autofill:active': {
        WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
        WebkitTextFillColor: 'white !important'
      }
    }
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,.68)',
    '&.Mui-focused': {
      color: '#efcb77'
    }
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(255,255,255,.62)',
    '&.Mui-error': {
      color: '#ff6b6b'
    }
  }
};

const cardStyles = {
  background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
  border: '1px solid rgba(255,255,255,.08)',
  backdropFilter: 'blur(10px)',
  borderRadius: '4px'
};

const primaryButtonStyles = {
  background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
  color: '#000',
  padding: { md: '18px 42px', xs: '16px 36px' },
  textTransform: 'uppercase',
  letterSpacing: '0.22em',
  fontSize: { md: '0.78rem', xs: '0.72rem' },
  fontWeight: 700,
  boxShadow: '0 15px 35px rgba(221,180,93,.15)',
  transition: 'all 0.4s ease',
  borderRadius: 0,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 50px rgba(221,180,93,.22)',
    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)'
  },
  '&:disabled': {
    opacity: 0.6,
    transform: 'none'
  }
};

const secondaryButtonStyles = {
  border: '1px solid rgba(255,255,255,.15)',
  color: 'white',
  padding: { md: '12px 28px', xs: '10px 24px' },
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontSize: { md: '0.78rem', xs: '0.72rem' },
  fontWeight: 600,
  transition: 'all 0.35s ease',
  borderRadius: 0,
  '&:hover': {
    borderColor: '#ddb45d',
    color: '#ddb45d',
    background: 'transparent'
  }
};

export default function WalletRequests() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()





  return (
    <Stack spacing={3}>
      <Card sx={cardStyles}>
        <CardContent sx={{ p: { md: 4, xs: 3 } }}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{
              color: 'white',
              fontSize: { md: '2.8rem', xs: '2rem' },
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
          >
            Wallet Withdrawal Request
          </Typography>
        </CardContent>
      </Card>

      <Card sx={cardStyles}>
        <CardContent sx={{ p: { md: 3, xs: 2 } }}>
          <List>
            <Grid container>
              <Grid item xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconUser color="#efcb77" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Account Name"
                    secondary="Victory World"
                    primaryTypographyProps={{ sx: { color: 'white', fontWeight: 600 } }}
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,.82)' } }}
                  />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconBuilding color="#efcb77" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Bank"
                    secondary="Axis Bank"
                    primaryTypographyProps={{ sx: { color: 'white', fontWeight: 600 } }}
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,.82)' } }}
                  />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconBuildingBank color="#efcb77" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true, sx: { color: 'white', fontWeight: 600 } }}
                    primary="Branch"
                    secondary="Dindigul main"
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,.82)' } }}
                  />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconId color="#efcb77" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Account Number"
                    secondary="924020051741869"
                    primaryTypographyProps={{ sx: { color: 'white', fontWeight: 600 } }}
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,.82)' } }}
                  />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconNumbers color="#efcb77" />
                  </ListItemIcon>
                  <ListItemText
                    primary="IFSC"
                    secondary="UTIB0000352"
                    primaryTypographyProps={{ sx: { color: 'white', fontWeight: 600 } }}
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,.82)' } }}
                  />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </CardContent>
      </Card>

      <Box
        sx={{
          height: '40vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card sx={{
          ...cardStyles,
          maxWidth: 400,
          width: '100%',
          transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            borderColor: 'rgba(221,180,93,.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,.5)'
          }
        }}>
          <CardMedia
            component="img"
            height="220"
            image="/img/Wallet_request.jpeg"
            alt="Wallet Withdrawal Request Process Guide"
            sx={{
              borderBottom: '1px solid rgba(255,255,255,.08)'
            }}
          />
          <CardActions sx={{ justifyContent: 'center', p: 2 }}>
            <Button
              size="small"
              component="a"
              href="/pdf/ZERROO WALLET REQUEST PROCESS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              sx={secondaryButtonStyles}
              aria-label="View wallet withdrawal request process guide"
            >
              View Process Guide
            </Button>
          </CardActions>
        </Card>
      </Box>


      <Formik
        validationSchema={Yup.object().shape({
          amount: Yup.number().nullable().min(1, 'Amount should be minimum 1').required('Amount is required'),
          transaction: Yup.string().matches(REGEX.ALPHANUMERIC, 'This field should have only Alphabets and Numeric Values')
            .required('Enter Transaction ID'),
          depositor: Yup.string().required('Enter Depositor name'),
          proof: Yup.mixed().required('Upload Screenshot of the transaction')
            .test("fileSize", "The file is too large", value => (!value || !value.length) || value[0].size <= 2 * 1024 * 1024)
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          const formData = values
          formData.date = formData.date * 1
          return await fetcher(`/api/verification/wallet`, {
            method: 'post',
            body: constructFormData(formData)
          })
            .then(res => res.json())
            .then(({ status, message = 'Exception occurred' }) => {
              if (status === 'success') {
                enqueueSnackbar('Wallet withdrawal request submitted successfully', { variant: 'success' })
                navigate('/dashboard/wallet-requests')
              } else {
                enqueueSnackbar(message, { variant: 'error' })
                setSubmitting(false)
              }
            })
            .catch(() => {
              enqueueSnackbar('Error occurred', { variant: 'error' })
              setSubmitting(false)
            })
        }}
        initialValues={{
          amount: '',
          date: new Date(),
          method: 'UPI',
          transaction: '',
          depositor: '',
          proof: ''
        }}>
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(touched.method && errors.method)}>
                  <FormLabel
                    required
                    sx={{
                      color: 'rgba(255,255,255,.82)',
                      fontWeight: 600,
                      mb: 1,
                      '&.Mui-focused': {
                        color: '#efcb77'
                      }
                    }}
                  >
                    Payment Method
                  </FormLabel>
                  <RadioGroup
                    row
                    id="method"
                    value={values.method}
                    name="method"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    aria-label="Payment Method"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        color: 'rgba(255,255,255,.82)',
                        fontSize: { md: '1rem', xs: '0.95rem' }
                      },
                      '& .MuiRadio-root': {
                        color: 'rgba(255,255,255,.68)',
                        '&.Mui-checked': {
                          color: '#efcb77'
                        }
                      }
                    }}
                  >
                    <FormControlLabel value="UPI" label="UPI" control={<Radio />} />
                    <FormControlLabel value="Online Transfer (NEFT/RTGS)" label="Online Transfer (NEFT/RTGS)" control={<Radio />} />
                    <FormControlLabel value="IMPS" label="IMPS" control={<Radio />} />
                    <FormControlLabel value="ATM Transfer" label="ATM Transfer" control={<Radio />} />
                    <FormControlLabel value="Money Transfer" label="Money Transfer" control={<Radio />} />
                  </RadioGroup>
                  {touched.method && errors.method && (
                    <FormHelperText error id="error-method">
                      {errors.method}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.amount && errors.amount)}>
                  <TextField
                    required
                    id="amount"
                    type="number"
                    value={values.amount}
                    name="amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Deposited Amount"
                    sx={formFieldStyles}
                    inputProps={{
                      'aria-label': 'Deposited Amount'
                    }}
                  />
                  {touched.amount && errors.amount && (
                    <FormHelperText error id="error-amount">
                      {errors.amount}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.date && errors.date)}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Transaction Date"
                      maxDate={new Date()}
                      inputFormat="DD/MM/YYYY"
                      value={values.date}
                      onChange={date => {
                        handleChange({ target: { name: "date", value: date } }, date)
                      }}
                      renderInput={params =>
                        <React.Fragment>
                          <TextField
                            required
                            id="date"
                            value={values.date}
                            name="date"
                            onBlur={handleBlur}
                            InputProps={{
                              endAdornment: <IconCalendar color="#efcb77" />
                            }}
                            label="Date"
                            sx={formFieldStyles}
                            inputProps={{
                              'aria-label': 'Transaction Date'
                            }}
                            {...params}
                          />
                        </React.Fragment>}
                    />
                  </LocalizationProvider>
                  {touched.date && errors.date && (
                    <FormHelperText error id="error-date">
                      {errors.date}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.depositor && errors.depositor)}>
                  <TextField
                    required
                    id="depositor"
                    type="text"
                    value={values.depositor}
                    name="depositor"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Depositor Name"
                    sx={formFieldStyles}
                    inputProps={{
                      'aria-label': 'Depositor Name'
                    }}
                  />
                  {touched.depositor && errors.depositor && (
                    <FormHelperText error id="error-depositor">
                      {errors.depositor}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.transaction && errors.transaction)}>
                  <TextField
                    required
                    id="transaction"
                    type="text"
                    value={values.transaction}
                    name="transaction"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Transaction ID"
                    helperText="For PhonePe enter the UTR number"
                    sx={formFieldStyles}
                    inputProps={{
                      'aria-label': 'Transaction ID'
                    }}
                  />
                  {touched.transaction && errors.transaction && (
                    <FormHelperText error id="error-transaction">
                      {errors.transaction}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <HionImageUpload
                  name="proof"
                  handleChange={handleChange}
                  buttonText="Upload Proof"
                  maxFileSize={2 * 1024 * 1024}
                />
                {touched.proof && errors.proof && (
                  <FormHelperText error id="error-proof" sx={{ color: '#ff6b6b' }}>
                    {errors.proof}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={primaryButtonStyles}
                  aria-label="Submit wallet withdrawal request"
                >
                  Submit Request
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Stack>
  )
}
