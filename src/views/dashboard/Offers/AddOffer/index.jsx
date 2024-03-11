import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Grid,
  ButtonBase,
  TextField,
  MenuItem,
  InputBase,
  Button,
} from "@mui/material";
import InnerHeader from "ui-component/InnerHeader";
import { styled } from "@mui/material/styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import useCreateOffer from "hooks/useCreateOffer";
import { useEffect, useState } from "react";
import { openSnackbar } from "store/slices/snackbar";
import Loader from "ui-component/Loader";
import useGetAdvertisers from "hooks/useGetetAdvertisers";
import { useLocation, useNavigate } from "react-router-dom";
import useGetAudience from "hooks/useGetAudience";
import useGetConversions from "hooks/useGetAllConversion";

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  advertiser: yup.string().required("Advertisor is required"),
  offerUrl: yup.string().required("URL is Required"),
  audience: yup.string().required("Audience is Required"),
  conversionTracking: yup.string(),
  iframeScript: yup.string(),
  javascriptCode: yup.string(),
  postbackUrl: yup.string(),
});
const MainHeading = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  color: theme.palette.common.white,
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  marginBottom: 16,
}));
const SecondaryHeading = styled("h4")(({ theme }) => ({
  ...theme.typography.button,
  color: theme.palette.common.white,
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "30px",
  marginBottom: 14,
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

const AddOffer = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {data: {conTrackingList = []} ={}} = useGetConversions();
  debugger;
  const { data = {} } = useGetAdvertisers();
  const { advertisers = [] } = data;
  const { data: { data: audience = [] } = {} } = useGetAudience();
  const { createOffer } = useCreateOffer();
  const initialValues = {
    _id: state?.offer?._id || "",
    name: state?.offer?.name || "",
    advertiser: state?.offer?.advertiser?._id || "",
    offerUrl: state?.offer?.offerUrl || "",
    audience: state?.offer?.audience?._id || "",
    conversionTracking: state?.offer?.conversionTracking || "",
  };
  const [loader, setLoader] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

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

  useEffect(() => {
    if (state && state.offer && state.offer._id) {
      setFormInitialValues();
    }
  }, [state]);
  const setFormInitialValues = () => {
    setFormValues((prev) => ({
      ...prev,
      _id: state?.offer?._id || "",
      name: state?.offer?.name || "",
      advertiser: state?.offer?.advertiser || "",
      offerUrl: state?.offer?.offerUrl || "",
      audience: state?.offer?.audience || "",
      conversionTracking: state?.offer?.conversionTracking || "",
    }));
  };
  const submitHandler = async (values, { resetForm }) => {
    setLoader(true);
    try {
      const result = await createOffer(values);
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
        navigate(-1)
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
          const handleTrackingMethodChange = (event) => {
            const selectedTrackingMethod = event.target.value;
            setFieldValue("conversionTracking", selectedTrackingMethod);
          };
          return (
            <Form onSubmit={handleSubmit}>
              <InnerHeader title={"Add Offer"} text={text} />
              <Container maxWidth="lg" style={{ marginTop: "3rem" }}>
                <MainHeading>Add Offer</MainHeading>
                <Grid display={"flex"} gap={{ md: 4 }}>
                  <Grid xs={6}>
                    <Box display={"flex"} flexDirection={"column"} rowGap={3}>
                      <FormControl variant="standard">
                        <InputLabel
                          shrink
                          htmlFor="name"
                          style={{ color: "#616161" }}
                        >
                          Name*
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Name"
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
                          htmlFor="advertiser"
                          sx={{
                            color: "#616161",
                          }}
                        >
                          Advertiser
                        </InputLabel>
                        <CustomStrapAutoComplete
                          type={"text"}
                          variant="standard"
                          name="advertiser"
                          select
                          onChange={handleChange}
                          error={
                            touched?.advertiser && Boolean(errors?.advertiser)
                          }
                          helperText={touched?.advertiser && errors?.advertiser}
                          value={values.advertiser}
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
                            Please select an Advertiser
                          </MenuItem>
                          {advertisers?.map((item, index) => (
                            <MenuItem
                              value={item?._id}
                              key={`${index}-categories-type-${item?._id}`}
                            >
                              {item?.name}
                            </MenuItem>
                          ))}
                        </CustomStrapAutoComplete>
                      </Box>
                      <FormControl variant="standard">
                        <InputLabel
                          shrink
                          htmlFor="offerURL"
                          sx={{
                            color: "#616161",
                          }}
                        >
                          Offer URL
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Offer URL"
                          id="offerUrl"
                          name="offerUrl"
                          value={values.offerUrl}
                          error={touched?.offerUrl && errors?.offerUrl}
                          helperText={touched?.offerUrl && errors?.offerUrl}
                          onChange={handleChange}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </FormControl>
                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="assignAudience"
                          sx={{
                            color: "#616161",
                          }}
                        >
                          Assign Audience
                        </InputLabel>
                        <CustomStrapAutoComplete
                          type={"text"}
                          variant="standard"
                          name="audience"
                          select
                          onChange={handleChange}
                          error={touched?.audience && Boolean(errors?.audience)}
                          helperText={touched?.audience && errors?.audience}
                          value={values.audience}
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
                              {state?.offer?.audience?.name
                                ? state?.offer?.audience?.name
                                : item.groupName}
                            </MenuItem>
                          ))}
                        </CustomStrapAutoComplete>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid xs={6}>
                    <Box>
                      <SecondaryHeading>
                        Chose Conversion Tracking
                      </SecondaryHeading>
                      <FormControl variant="standard">
                        <InputLabel
                          shrink
                          htmlFor="conversionTracking"
                          sx={{
                            color: "#616161",
                          }}
                        >
                          Tracking Method*
                        </InputLabel>
                        <CustomStrapAutoComplete
                          type={"text"}
                          variant="standard"
                          name="conversionTracking"
                          select
                          onChange={handleTrackingMethodChange}
                          error={
                            touched?.conversionTracking && errors?.conversionTracking
                          }
                          helperText={
                            touched?.conversionTracking && errors?.conversionTracking
                          }
                          value={values.conversionTracking}
                          fullWidth
                          SelectProps={{
                            displayEmpty: true,
                          }}
                          sx={{
                            marginTop: 2,
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
                            Please select a Tracking Method
                          </MenuItem>
                          {conTrackingList?.map((item, index) => (
                            <MenuItem
                              value={item?._id}
                              key={`${index}-categories-type-${item?._id}`}
                            >
                              {state?.offer?.audience?.name
                                ? state?.offer?.audience?.name
                                : item.trackingName}
                            </MenuItem>
                          ))}
                        </CustomStrapAutoComplete>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
              <CustomStrapButton type="submit">Add Offer</CustomStrapButton>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddOffer;
