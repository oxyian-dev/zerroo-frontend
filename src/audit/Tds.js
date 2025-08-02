import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import moment from 'moment';
import React, { useState } from 'react';
import PROXY from '../utils/proxy';

const Tds = () => {
  const [values, setValues] = useState([null, null]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([null, null]);
  const exportGst = e => {
    setLoading(true);
    let error = false;
    if (!values[0] && !values[1]) {
      setErrors(['Select From Date', 'Select To Date'])
      error = true
    } else if (!values[0]) {
      setErrors(['Select From Date', error[1]])
      error = true
    } else if (!values[1]) {
      setErrors([error[0], 'Select To Date'])
      error = true
    }
    if (error) {
      setLoading(false)
      e.preventDefault();
      return
    }
    setErrors([null, null])
    setLoading(false)
    const form = e.target;
    const format = 'DD/MM/YYYY'
    form.from.value = moment(form.fromStr.value, format).zone('Asia/Kolkata').valueOf()
    form.to.value = moment(form.toStr.value, format).zone('Asia/Kolkata').endOf('day').valueOf()
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h2" textAlign="center">
            TDS Report
          </Typography>
        </CardContent>
      </Card>
      <Typography my={2}>Select from and to date to export TDS data</Typography>
      <form noValidate action={`${PROXY}/api/admin/tds`} method="post" onSubmit={exportGst}>
        <input hidden name="from" />
        <input hidden name="to" />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: 'From', end: 'To' }}
        >
          <DateRangePicker
            inputFormat="DD/MM/YYYY"
            value={values}
            onChange={setValues}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={Boolean(errors[0])}>
                      <TextField
                        required
                        id="name"
                        type="text"
                        value={values.from}
                        name="fromStr"
                        {...startProps}
                      />
                      {errors[0] && (
                        <FormHelperText error id="error-from">
                          {errors[0]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={Boolean(errors[1])}>
                      <TextField
                        required
                        id="name"
                        type="text"
                        value={values.to}
                        name="toStr"
                        {...endProps}
                      />
                      {errors[1] && (
                        <FormHelperText error id="error-to">
                          {errors[1]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        <Box mt={2}>
          <LoadingButton
            loading={loading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Export
          </LoadingButton>
        </Box>
      </form>
    </Box >
  )
}

export default Tds