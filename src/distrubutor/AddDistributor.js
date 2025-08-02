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
      >
        <DialogTitle>
          <Typography variant="h3">
            New Distributor ID created
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Distributor ID: <Box component="span" fontWeight={700}>{did}</Box></Typography>
            <Typography>Password: <Box component="span" fontWeight={700}>{password}</Box></Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => { navigate(`/dashboard/genealogy/${did}`) }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h2" textAlign="center">Refer a Distributor</Typography>
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
              <Grid container spacing={2}>
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
