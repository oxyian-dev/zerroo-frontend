
import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import fetcher from "../../utils/fetcher";
import { constructFormData } from "../../utils/util";

export default function AddComboGroup() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  return (
    <Formik
      validationSchema={Yup.object().shape({
        name: Yup.string().max(100).required('Name is required'),
        description: Yup.string().max(250).required('Description is required'),
        price: Yup.number().required('Select a Price List'),
        items: Yup.array().of(Yup.number()).min(1, 'Some Items has to be selected').nullable()
          .required('Some Items has to be selected')
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)
        return await fetcher(`/api/combos/groups`, {
          method: 'post',
          body: constructFormData(values)
        })
          .then(res => res.json())
          .then(res => {
            if (res.status === 'success') {
              enqueueSnackbar('Combo Group Added Successfully', { variant: 'success' })
              navigate('/admin/combos/groups')
            } else {
              enqueueSnackbar('Exception occurred', { variant: 'error' })
              setSubmitting(false)
            }
          })
          .catch(() => {
            enqueueSnackbar('Error occurred', { variant: 'error' })
            setSubmitting(false)
          })
      }}
      initialValues={{
        name: '',
        description: '',
        price: '',
        items: []
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
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h2" textAlign="center">Add Combo Group</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
                <TextField
                  required
                  variant="outlined"
                  id="name"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Name"
                />
                {touched.name && errors.name && (
                  <FormHelperText error id="error-name">
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <ServerAutocomplete
                  required
                  id="price"
                  select="price"
                  name="price"
                  label="Price List"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                />
                {touched.price && errors.price && (
                  <FormHelperText error id="error-price">
                    {errors.price}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
                <TextField
                  required
                  id="description"
                  type="text"
                  value={values.description}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Description"
                  helperText="Max 250 characters"
                />
                {touched.description && errors.description && (
                  <FormHelperText error id="error-description">
                    {errors.description}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <ServerAutocomplete
                  required
                  multiple
                  id="items"
                  name="items"
                  select="group"
                  label="Item Group"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.items}
                />
                {touched.items && errors.items && (
                  <FormHelperText error id="error-items">
                    {errors.items}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText id='error-submit' error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <LoadingButton
              loading={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create
            </LoadingButton>
          </Box>
        </form>
      )}
    </Formik>
  )
}
