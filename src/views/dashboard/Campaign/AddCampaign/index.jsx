import {
  Box,
  Container,
  FormControl,
  InputLabel,
  InputBase,
  Grid,
  ButtonBase,
  Autocomplete,
  createFilterOptions,
  TextField,
} from "@mui/material";
import InnerHeader from "ui-component/InnerHeader";
import { styled } from "@mui/material/styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import COUNTRIES from "countryList";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import useCreateCampaign from "hooks/useCreateCampaign";
import { openSnackbar } from "store/slices/snackbar";
import Loader from "ui-component/Loader";
import useGetAudience from "hooks/useGetAudience";
import useGetOffers from "hooks/useGetOffers";
const filter = createFilterOptions();

const MainHeading = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  color: theme.palette.common.white,
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  marginBottom: 16,
}));

const CustomStrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    borderRadius: 12,
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
      width: "500px",
    },
  },
}));

const CustomGreyStrapInput = styled(InputBase)(({ theme }) => ({
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

const CustomErrorMessage = styled(Box)(({ theme }) => ({
  marginTop: "6px",
  marginRight: "20px",
  textAlign: "right",
  position: "relative",
  color: theme.palette.secondary.dark,
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
  const formik = useFormik({
    initialValues: {
      name: "",
      offer: "",
      trafficSource: "",
      country: "",
      coastModel: "",
      finalUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      debugger;
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
          formik.resetForm();
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
    },
  });
  return (
    <Box sx={{ height: "100%" }}>
      {loader && <Loader />}
      <InnerHeader title={"Add Campaign"} text={text} />
      <form onSubmit={formik.handleSubmit}>
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
                    defaultValue=""
                    placeholder="Please Enter Campaign Name"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <CustomErrorMessage>
                      {formik.errors.name}
                    </CustomErrorMessage>
                  )}
                </FormControl>
                <Box>
                  <InputLabel
                    shrink
                    htmlFor="assign-offer"
                    sx={{ color: "#616161" }}
                  >
                    Assign Offer
                  </InputLabel>
                  <Autocomplete
                    id="assign-offer"
                    forcePopupIcon
                    popupIcon={<KeyboardArrowDown />}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("offer", newValue._id);
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      const { inputValue } = params;
                      const isExisting = options.some(
                        (option) => inputValue === option
                      );
                      if (inputValue !== "" && !isExisting) {
                        filtered.push(`Add "${inputValue}"`);
                      }
                      return filtered;
                    }}
                    options={offers.sort(
                      (a, b) => -b.name.localeCompare(a.name)
                    )}
                    getOptionLabel={(option) => option.name}
                    defaultValue={offers[0]}
                    freeSolo
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.name}
                      </Box>
                    )}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                      "& input": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? theme.palette.common.black
                            : theme.palette.secondary.light,
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="search"
                        size="small"
                        placeholder="Select Offer"
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            padding: 1,
                            height: "58px",
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? theme.palette.common.black
                                : theme.palette.secondary.light,
                            "& fieldset": { border: "none" },
                          },
                        }}
                      />
                    )}
                  />
                  {formik.touched.offer && formik.errors.offer && (
                    <CustomErrorMessage>
                      {formik.errors.offer}
                    </CustomErrorMessage>
                  )}
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
                  <Autocomplete
                    id="assignTrafficSource"
                    forcePopupIcon
                    popupIcon={<KeyboardArrowDown />}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("trafficSource", newValue._id);
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      const { inputValue } = params;
                      const isExisting = options.some(
                        (option) => inputValue === option
                      );
                      if (inputValue !== "" && !isExisting) {
                        filtered.push(`Add "${inputValue}"`);
                      }
                      return filtered;
                    }}
                    options={audience.sort(
                      (a, b) => -b.audienceName.localeCompare(a.audienceName)
                    )}
                    getOptionLabel={(option) => option.audienceName}
                    defaultValue={audience[0]}
                    freeSolo
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.audienceName}
                      </Box>
                    )}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                      "& input": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? theme.palette.common.black
                            : theme.palette.secondary.light,
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="search"
                        size="small"
                        placeholder="Select Traffic Source"
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            padding: 1,
                            height: "58px",
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? theme.palette.common.black
                                : theme.palette.secondary.light,
                            "& fieldset": { border: "none" },
                          },
                        }}
                      />
                    )}
                  />
                  {formik.touched.trafficSource &&
                    formik.errors.trafficSource && (
                      <CustomErrorMessage>
                        {formik.errors.trafficSource}
                      </CustomErrorMessage>
                    )}
                </Box>
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
                  <Autocomplete
                    id="countries"
                    forcePopupIcon
                    popupIcon={<KeyboardArrowDown />}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("country", newValue.code);
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      const { inputValue } = params;
                      const isExisting = options.some(
                        (option) => inputValue === option
                      );
                      if (inputValue !== "" && !isExisting) {
                        filtered.push(`Add "${inputValue}"`);
                      }
                      return filtered;
                    }}
                    options={COUNTRIES.sort(
                      (a, b) => -b.name.localeCompare(a.name)
                    )}
                    getOptionLabel={(option) => option.name}
                    freeSolo
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.name}
                      </Box>
                    )}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                      "& input": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? theme.palette.common.black
                            : theme.palette.secondary.light,
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="search"
                        size="small"
                        placeholder="Select Country"
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            padding: 1,
                            height: "58px",
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? theme.palette.common.black
                                : theme.palette.secondary.light,
                            "& fieldset": { border: "none" },
                          },
                        }}
                      />
                    )}
                  />
                  {formik.touched.country && formik.errors.country && (
                    <CustomErrorMessage>
                      {formik.errors.country}
                    </CustomErrorMessage>
                  )}
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
                    defaultValue=""
                    placeholder="Please Enter Campaign Name"
                    id="coastModel"
                    name="coastModel"
                    value={formik.values.coastModel}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.coastModel && formik.errors.coastModel && (
                    <CustomErrorMessage>
                      {formik.errors.coastModel}
                    </CustomErrorMessage>
                  )}
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
                    defaultValue=""
                    placeholder="Please Enter Campaign Name"
                    id="finalUrl"
                    name="finalUrl"
                    value={formik.values.finalUrl}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.finalUrl && formik.errors.finalUrl && (
                    <CustomErrorMessage>
                      {formik.errors.finalUrl}
                    </CustomErrorMessage>
                  )}
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <CustomStrapButton type="submit">Add Campaign</CustomStrapButton>
      </form>
    </Box>
  );
};

export default AddCampaign;
