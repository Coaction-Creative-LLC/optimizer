import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Grid,
  ButtonBase,
  TextField,
  MenuItem,
} from "@mui/material";
import InnerHeader from "ui-component/InnerHeader";
import { styled } from "@mui/material/styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import COUNTRIES from "countryList";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useCreateCampaign from "hooks/useCreateCampaign";
import { openSnackbar } from "store/slices/snackbar";
import Loader from "ui-component/Loader";
import useGetAudience from "hooks/useGetAudience";
import useGetOffers from "hooks/useGetOffers";
import { useLocation } from "react-router-dom";

const MainHeading = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  color: theme.palette.common.white,
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  marginBottom: 16,
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

const CustomGreyStrapInput = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    borderRadius: 12,
    backgroundColor:
      theme.palette.mode === "dark" ? "#181F3A" : theme.palette.secondary.light,
    height: "45px",
    color: "#595959",
    textDecoration: "underline",
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

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  offer: yup.string().required("Offer is required"),
  trafficSource: yup.string().required("Traffic Source is Required"),
  country: yup.string().required("Country is Required"),
  coastModel: yup.string().required("Coast Model is Required "),
  finalUrl: yup.string().required("Final URL is Required"),
});

const AddCampaign = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { data: { data: audience = [] } = {} } = useGetAudience();
  const { data: { data: offers = [] } = {} } = useGetOffers();
  const { createCampaign } = useCreateCampaign();
  const text = [
    {
      value: "Offers",
      url: "/offers",
    },
    {
      value: "Add Offer",
      url: "/add-offer",
    },
  ];
  const initialValues = {
    name: state?.campaign?.name || "",
    offer: state?.campaign?.offer || "",
    trafficSource: state?.campaign?.trafficSource || "",
    country: state?.campaign?.country || "",
    coastModel: state?.campaign?.coastModel || "",
    finalUrl: state?.campaign?.finalUrl || "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  useEffect(() => {
    if (state && state.offer && state.offer._id) {
      setFormInitialValues();
    }
  }, [state]);
  const setFormInitialValues = () => {
    setFormValues((prev) => ({
      ...prev,
      name: state?.campaign?.name || "",
      offer: state?.campaign?.offer || "",
      trafficSource: state?.campaign?.trafficSource || "",
      country: state?.campaign?.country || "",
      coastModel: state?.campaign?.coastModel || "",
      finalUrl: state?.campaign?.finalUrl || "",
    }));
  };
  const submitHandler = async (values, { resetForm }) => {
    setLoader(true);
    try {
      const result = await createCampaign(values);
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

  return (
    <Box sx={{ height: "100%" }}>
      {loader && <Loader />}
      <InnerHeader title={"Add Campaign"} text={text} />
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
                <MainHeading>Add Campaign</MainHeading>
                <Grid display={"flex"} gap={{ md: 4 }}>
                  <Grid xs={6}>
                    <Box display={"flex"} flexDirection={"column"} rowGap={3}>
                      <FormControl variant="standard">
                        <InputLabel
                          shrink
                          htmlFor="name"
                          style={{ color: "#616161" }}
                        >
                          Campaign Name*
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Campaign Name"
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

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="assign-offer"
                          sx={{ color: "#616161" }}
                        >
                          Assign Offer
                        </InputLabel>
                        <CustomStrapAutoComplete
                          type={"text"}
                          variant="standard"
                          name="offer"
                          select
                          onChange={handleChange}
                          error={touched?.offer && Boolean(errors?.offer)}
                          helperText={touched?.offer && errors?.offer}
                          value={values.offer}
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
                            Please select an Offer
                          </MenuItem>
                          {offers?.map((item, index) => (
                            <MenuItem
                              value={item?._id}
                              key={`${index}-categories-type-${item?._id}`}
                            >
                              {item?.name}
                            </MenuItem>
                          ))}
                        </CustomStrapAutoComplete>
                      </Box>

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="assignTrafficSource"
                          sx={{
                            color: "#616161",
                          }}
                        >
                          Assign Traffic Source
                        </InputLabel>
                        <CustomStrapAutoComplete
                          type={"text"}
                          variant="standard"
                          name="trafficSource"
                          select
                          onChange={handleChange}
                          error={
                            touched?.trafficSource &&
                            Boolean(errors?.trafficSource)
                          }
                          helperText={
                            touched?.trafficSource && errors?.trafficSource
                          }
                          value={values.trafficSource}
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
                            Please select an Audience
                          </MenuItem>
                          {audience?.map((item, index) => (
                            <MenuItem
                              value={item?._id}
                              key={`${index}-categories-type-${item?._id}`}
                            >
                              {item?.audienceName}
                            </MenuItem>
                          ))}
                        </CustomStrapAutoComplete>
                      </Box>
                      <FormControl variant="standard">
                        <InputLabel
                          shrink
                          htmlFor="Optiimizer URL"
                          style={{ color: "#616161" }}
                        >
                          Optiimizer URL*
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter URL"
                          id="default_link"
                          name="default_link"
                          value={values.name}
                          error={touched?.name && errors?.name}
                          helperText={touched?.name && errors?.name}
                          onChange={handleChange}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid xs={6}>
                    <Box display={"flex"} flexDirection={"column"} rowGap={3}>
                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="countries"
                          sx={{
                            color: "#616161",
                          }}
                        >
                          Select Country
                        </InputLabel>
                        <CustomStrapAutoComplete
                          type={"text"}
                          variant="standard"
                          name="country"
                          select
                          onChange={handleChange}
                          error={touched?.country && Boolean(errors?.country)}
                          helperText={touched?.country && errors?.country}
                          value={values.country}
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
                            Please select a Country
                          </MenuItem>
                          {COUNTRIES?.map((item, index) => (
                            <MenuItem
                              value={item?.code}
                              key={`${index}-categories-type-${item?.code}`}
                            >
                              {item?.name}
                            </MenuItem>
                          ))}
                        </CustomStrapAutoComplete>
                      </Box>
                      <FormControl variant="standard">
                        <InputLabel
                          shrink
                          htmlFor="s2sPostbackURL"
                          sx={{
                            color: "#616161",
                          }}
                        >
                          Coast Model
                        </InputLabel>

                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Coast Model"
                          id="coastModel"
                          coastModel="coastModel"
                          value={values.coastModel}
                          error={touched?.coastModel && errors?.coastModel}
                          helperText={touched?.coastModel && errors?.coastModel}
                          onChange={handleChange}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </FormControl>
                      <FormControl variant="standard">
                        <InputLabel
                          shrink
                          htmlFor="s2sPostbackURL"
                          sx={{
                            color: "#616161",
                          }}
                        >
                          Final URL
                        </InputLabel>

                        <CustomGreyStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Campaign Name"
                          id="finalUrl"
                          name="finalUrl"
                          error={touched?.finalUrl && errors?.finalUrl}
                          helperText={touched?.finalUrl && errors?.finalUrl}
                          value={values.finalUrl}
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
              <CustomStrapButton type="submit">Add Campaign</CustomStrapButton>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddCampaign;
