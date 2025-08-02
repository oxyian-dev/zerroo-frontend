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

export default function WalletRequests() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()





  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h2" textAlign="center">Wallet Request</Typography>
        </CardContent>
      </Card>

      <Card elevation={2}>
        <CardContent>
          <List>
            <Grid container>
              <Grid item xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconUser />
                  </ListItemIcon>
                  <ListItemText primary="Account Name" secondary="ZERABIZ ECOM LLP" />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconBuilding />
                  </ListItemIcon>
                  <ListItemText primary="Bank" secondary="Axis Bank" />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconBuildingBank />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Branch" secondary="Dindigul main" />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconId />
                  </ListItemIcon>
                  <ListItemText primary="Account Number" secondary="924020051741869" />
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <IconNumbers />
                  </ListItemIcon>
                  <ListItemText primary="IFSC" secondary="UTIB0000352" />
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
        <Card sx={{ maxWidth: 400, width: '100%' }}>

          <CardMedia
            component="img"
            height="220"
            image="/img/Wallet_request.jpeg"
            alt="Wallet Request Screen Shot"
          />


          <CardActions sx={{ justifyContent: 'center' }}>
            <Button size="small" component="a" href="/pdf/ZERROO WALLET REQUEST PROCESS.pdf" target="_blank" rel="noopener noreferrer" textAlign="center" >View More</Button>
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
                enqueueSnackbar('Wallet Requested Successfully', { variant: 'success' })
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(touched.method && errors.method)}>
                  <FormLabel required>Payment Method</FormLabel>
                  <RadioGroup
                    row
                    id="method"
                    value={values.method}
                    name="method"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Payment Method">
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
                            InputProps={{ endAdornment: <IconCalendar /> }}
                            label="Date"
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
                  <FormHelperText error id="error-proof">
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
                >
                  Create Request
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Stack>
  )
}
