import {
  Box,
  Container,
  FormControl,
  InputLabel,
  InputBase,
  Grid,
  ButtonBase,
  TextField,
  MenuItem,
} from "@mui/material";
import InnerHeader from "ui-component/InnerHeader";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as yup from "yup";
import useAddAdvertiser from "hooks/useCreateAdvertiser";
import { openSnackbar } from "store/slices/snackbar";
import { useDispatch } from "react-redux";
import Loader from "ui-component/Loader";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { KeyboardArrowDown } from "@mui/icons-material";
import States from "States";
const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  website: yup.string().required("Website URL is required"),
  address: yup.string().required("address is required"),
  city: yup.string().required('city is Required'),
  state: yup.string().required('state is Required'),
  zip: yup.string().required('city is Required'),
  notes: yup.string(),
});
const MainHeading = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  color: theme.palette.common.white,
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  padding: theme.spacing(1),
}));

const CustomStrapInput = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    borderRadius: 12,
    padding: 6,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.common.black
        : theme.palette.secondary.light,
    height: "45px",
    flexShrink: 0,
    paddingLeft: 12,
    [theme.breakpoints.down("md")]: {
      width: "320px",
    },
    [theme.breakpoints.up("md")]: {
      width: "540px",
    },
  },
}));
const CustomStrapAutoComplete = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    position: "relative",
    borderRadius: 12,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.common.black
        : theme.palette.secondary.light,
    height: "58px",
    flexShrink: 0,
    "&:before": {
      content: "none",
    },
    "&:after": {
      content: "none",
    },
    "& .MuiSelect-icon": {
      display: "none",
    },
  },
  "& .MuiInputBase-input": {
    paddingLeft: 12,
    paddingRight: "39px",
    [theme.breakpoints.down("md")]: {
      width: "320px",
    },
    [theme.breakpoints.up("md")]: {
      width: "500px",
    },
  },
}));

const CustomStrapTextArea = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    borderRadius: 12,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.common.black
        : theme.palette.secondary.light,
    height: "236px",
    flexShrink: 0,
    padding: "12px 0 0 12px",
    [theme.breakpoints.down("md")]: {
      width: "330px",
    },
    [theme.breakpoints.up("md")]: {
      width: "520px",
    },
  },
}));

const CustomStrapButton = styled(ButtonBase)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.secondary.dark
      : theme.palette.secondary.light,
  height: "42px",
  width: "140.967px",
  fontWeight: 700,
  fontSize: 16,
  float: "right",
  position: "absolute",
  bottom: 50,
  right: 60,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.common.black,
}));

const AddAdvertiser = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const theme = useTheme();
  const initialValues = {
    _id: state?.advertiser?._id || "",
    name: state?.advertiser?.name || "",
    website: state?.advertiser?.website || "",
    notes: state?.advertiser?.notes || "",
    address: state?.advertiser?.address || "",
    city: state?.advertiser?.city || "",
    state: state?.advertiser?.state || "",
    zip: state?.advertiser?.zip || "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const { addAdvertiser } = useAddAdvertiser();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (state && state.advertiser && state.advertiser._id) {
      setFormInitialValues();
    }
  }, [state]);
  const setFormInitialValues = () => {
    setFormValues((prev) => ({
      ...prev,
      _id: state.advertiser._id || "", 
      name: state.advertiser.name || "",
      website: state.advertiser.website || "",
      notes: state.advertiser.notes || "",
      address: state?.advertiser?.address || "",
      city: state?.advertiser?.city || "",
      state: state?.advertiser?.state || "",
      zip: state?.advertiser?.zip || "",
    }));
  };
  const submitHandler = async (values, { resetForm }) => {
    setLoader(true);
    try {
      const result = await addAdvertiser(values);
      if (result.status === 200) {
        dispatch(
          openSnackbar({
            open: true,
            message: result.msg,
            variant: "alert",
            alert: {
              color: "success",
            },
            close: false,
          })
        );
        setLoader(false);
        resetForm();
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          open: true,
          message: error.msg,
          variant: "alert",
          alert: {
            color: "error",
          },
          close: false,
        })
      );
      setLoader(false);
    }
  };

  const text = [
    {
      value: "Advertiser",
      url: "/advertiser",
    },
    {
      value: "Add Advertiser",
      url: "/add-advertiser",
    },
  ];

  return (
    <Box sx={{ height: "100%" }}>
      {loader && <Loader />}
      <InnerHeader title={"Add Advertiser"} text={text} />
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          enableReinitialize,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Container maxWidth="lg" style={{ marginTop: "3rem" }}>
                <MainHeading>Add Advertiser</MainHeading>
                <Grid display={"flex"} gap={{ md: 4 }}>
                  <Grid xs={6}>
                    <Box display={"flex"} flexDirection={"column"} rowGap={3}>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="name">
                          Name*
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Advertiser Name"
                          id="name"
                          name="name"
                          value={values.name}
                          error={touched?.name && errors?.name}
                          helperText={touched?.name && errors?.name}
                          onChange={handleChange}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </FormControl>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="website">
                          website*
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter website URL"
                          id="website"
                          name="website"
                          value={values.website}
                          error={touched?.website && errors?.website}
                          helperText={touched?.website && errors?.website}
                          onChange={handleChange}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </FormControl>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="website">
                          Notes
                        </InputLabel>
                        <CustomStrapTextArea
                          defaultValue=""
                          placeholder="Note"
                          multiline
                          name="notes"
                          rows={7}
                          Fvalue={values.notes}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid xs={6}>
                    <Box display={"flex"} flexDirection={"column"} rowGap={3}>
                    <FormControl variant="standard">
                        <InputLabel shrink htmlFor="streetAddress">
                          Street Address*
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Your Address"
                          id="address"
                          name="address"
                          value={values.address}
                          error={touched?.address && errors?.address}
                          helperText={touched?.address && errors?.address}
                          onChange={handleChange}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </FormControl>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="city">
                          City*
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Your City"
                          id="city"
                          name="city"
                          value={values.city}
                          error={touched?.city && errors?.city}
                          helperText={touched?.city && errors?.city}
                          onChange={handleChange}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </FormControl>
                      <Box>
                      <InputLabel
                          shrink
                          htmlFor="state"
                        >
                          State*
                        </InputLabel>
                        <CustomStrapAutoComplete
                          type={"text"}
                          variant="standard"
                          name="state"
                          select
                          onChange={handleChange}
                          error={touched?.state && Boolean(errors?.state)}
                          helperText={touched?.state && errors?.state}
                          value={values.state}
                          fullWidth
                          SelectProps={{
                            displayEmpty: true,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                            "& input": {
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? theme.palette.common.black
                                  : theme.palette.secondary.light,
                              border: "none",
                            },
                          }}
                          InputProps={{
                            endAdornment: <KeyboardArrowDown />,
                          }}
                        >
                          <MenuItem value={""} disabled>
                            Please select a State
                          </MenuItem>
                          {States?.map((item, index) => (
                            <MenuItem
                              value={item?.code}
                              key={`${index}-categories-type-${item?.code}`}
                            >
                              { item?.name}
                            </MenuItem>
                          ))}
                        </CustomStrapAutoComplete>
                      </Box>
                      <FormControl variant="standard">
                        <InputLabel shrink htmlFor="website">
                          Zip Code*
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Your Zip Code"
                          id="zip"
                          name="zip"
                          value={values.zip}
                          error={touched?.zip && errors?.zip}
                          helperText={touched?.zip && errors?.zip}
                          onChange={handleChange}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
              <CustomStrapButton type="submit">
                Add Advertiser
              </CustomStrapButton>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddAdvertiser;
