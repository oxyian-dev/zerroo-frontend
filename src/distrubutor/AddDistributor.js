import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { getName, getUsername } from '../auth/AuthProvider';
import fetcher from '../utils/fetcher';
import { constructFormData, formatName } from '../utils/util';

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
  },
  '&:disabled': {
    opacity: 0.4,
    borderColor: 'rgba(255,255,255,.08)'
  }
};

export default function AddDistributor() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const { parent, placement } = useParams()

  const [show, setShow] = useState(false)
  const [did, setDid] = useState('')
  const [password, setPassword] = useState('')
  const [loadReferer, setLoadReferer] = useState(false);
  


  const getDistributorName = async username => {
    const res = await fetcher(`/api/distributors/zid/${username}?upline=${encodeURIComponent(parent)}`)
    const json = await res.json()
    return json
  }

  return (
    <React.Fragment>
      <Dialog
        open={show}
        onClose={() => { setShow(false) }}
        PaperProps={{
          sx: {
            ...cardStyles,
            p: 3
          }
        }}
      >
        <DialogTitle>
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontSize: { md: '2rem', xs: '1.5rem' },
              fontWeight: 700
            }}
          >
            New Distributor ID created
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography sx={{ color: 'rgba(255,255,255,.82)', mb: 1 }}>
              Distributor ID: <Box component="span" fontWeight={700} sx={{ color: '#efcb77' }}>{did}</Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,.82)' }}>
              Password: <Box component="span" fontWeight={700} sx={{ color: '#efcb77' }}>{password}</Box>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => { navigate(`/dashboard/genealogy/${did}`) }}
            sx={secondaryButtonStyles}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

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
              Refer a Distributor
            </Typography>
          </CardContent>
        </Card>
        <Formik
          validationSchema={Yup.object().shape({
            firstname: Yup.string().required("Enter the Firstname as per PAN"),
            lastname: Yup.string().required("Enter the Lastname as per PAN"),
            phone: Yup.number().nullable(true).min(6000000000, "Invalid Number")
              .max(9999999999, "Invalid Number").required('Phone Number is required'),
            email: Yup.string().email("Invalid Email").required('Email Required'),
            referer: Yup.string().required("Enter Referer's ZID"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            const body = constructFormData(values)
            return fetcher(`/api/distributors/refer`, { method: 'post', body })
              .then(r => r.json())
              .then(({ status, message = "Exception occurred", username, password }) => {
                if (status === 'success') {
                  setDid(username)
                  setPassword(password)
                  setShow(true)
                } else {
                  enqueueSnackbar(message, { variant: "error" })
                  setSubmitting(false)
                }
              })
          }}
          initialValues={{
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            referer: getUsername(),
            referer_name: getName(),
            parent,
            placement: placement === 'left' ? 1 : 2
          }}>
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setValues,
            isSubmitting,
            setSubmitting,
            touched,
            values
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={Boolean(touched.firstname && errors.firstname)}>
                    <TextField
                      required
                      id="firstname"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Firstname"
                      helperText="Firstname as per PAN"
                      sx={formFieldStyles}
                      inputProps={{
                        'aria-label': 'Firstname as per PAN'
                      }}
                    />
                    {touched.firstname && errors.firstname && (
                      <FormHelperText error id="error-firstname">
                        {errors.firstname}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={Boolean(touched.lastname && errors.lastname)}>
                    <TextField
                      required
                      id="lastname"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Lastname"
                      helperText="Lastname as per PAN"
                      sx={formFieldStyles}
                      inputProps={{
                        'aria-label': 'Lastname as per PAN'
                      }}
                    />
                    {touched.lastname && errors.lastname && (
                      <FormHelperText error id="error-lastname">
                        {errors.lastname}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                    <TextField
                      required
                      type="tel"
                      id="phone"
                      value={values.phone}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Phone Number"
                      helperText="Enter the correct Phone Number"
                      sx={formFieldStyles}
                      inputProps={{
                        'aria-label': 'Phone Number'
                      }}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="error-phone">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                    <TextField
                      required
                      id="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Email Address"
                      helperText="Enter the correct Email Address"
                      sx={formFieldStyles}
                      inputProps={{
                        'aria-label': 'Email Address'
                      }}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="error-email">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={Boolean(touched.referer && errors.referer)}>
                      <TextField
                        required
                        id="referer"
                        value={values.referer}
                        name="referer"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          setLoadReferer(true);
                        }}
                        label="Referer ID"
                        helperText="Enter Referer's ZID"
                        sx={formFieldStyles}
                        inputProps={{
                          'aria-label': 'Referer ID'
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                            variant="contained"
                            disabled={!loadReferer || isSubmitting}
                            onClick={async () => {
                              setSubmitting(true);
                              const name = await getDistributorName(values.referer);
                              if (name.firstname && name.lastname) {
                                setValues({ ...values, referer_name: formatName(name) });
                                enqueueSnackbar("Referer name loaded successfully", { variant: "success" });
                              } else {
                                enqueueSnackbar("Referer should be an upline", { variant: "error" });
                                setValues({
                                  ...values,
                                  referer: getUsername(),
                                  referer_name: getName(),
                                });
                              }
                              setSubmitting(false);
                              setLoadReferer(false);
                            }}
                            sx={{
                              ...secondaryButtonStyles,
                              ml: 1,
                              minWidth: 'auto',
                              padding: { md: '8px 20px', xs: '6px 16px' }
                            }}
                          >
                            Load
                          </Button>)
                      }}
                      />
                      {touched.referer && errors.referer && (
                        <FormHelperText error id="error-referer">
                          {errors.referer}
                        </FormHelperText>
                      )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(touched.referer_name && errors.referer_name)}>
                    <TextField
                      id="referer_name"
                      value={values.referer_name}
                      name="referer_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Referer Name"
                      InputProps={{
                        readOnly: true,
                        disabled: true
                      }}
                      helperText="Refer's Name will be displayed here"
                      sx={formFieldStyles}
                      inputProps={{
                        'aria-label': 'Referer Name'
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    loading={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={loadReferer || isSubmitting}
                    sx={primaryButtonStyles}
                    aria-label="Add Distributor"
                  >
                    Add Distributor
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Stack>
    </React.Fragment>
  )
}
