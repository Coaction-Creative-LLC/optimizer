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
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import useCreateOffer from "hooks/useCreateOffer";
import { useState } from "react";
import { openSnackbar } from "store/slices/snackbar";
import Loader from "ui-component/Loader";
import useGetAdvertisers from "hooks/useGetetAdvertisers";
import useGetAudience from "hooks/useGetAudience";
const filter = createFilterOptions();

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  advertiser: yup.string().required("Advertisor is required"),
  offerUrl: yup.string().required("URL is Required"),
  audience: yup.string().required("Audience is Required"),
  tracking_method: yup.string(),
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
const CustomErrorMessage = styled(Box)(({theme})  =>({
  marginTop: "6px",
  marginRight: "20px",
  textAlign: "right",
  position:"relative",
  color: theme.palette.secondary.dark
}))
const AddOffer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data = {} } = useGetAdvertisers();
  const { advertisers = [] } = data;
  const { data: { data: audience = [] } = {} } = useGetAudience();
  const { createOffer } = useCreateOffer();
  const [loader, setLoader] = useState(false);

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
      advertiser: "",
      offerUrl: "",
      audience: "",
      tracking_method: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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
      <form onSubmit={formik.handleSubmit}>
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
                    defaultValue=""
                    placeholder="Please Enter Advertise Name"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage >{formik.errors.name}</CustomErrorMessage>
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
                  <Autocomplete
                    id="advertiser"
                    forcePopupIcon
                    popupIcon={<KeyboardArrowDown />}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('advertiser', newValue._id)
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
                    options={advertisers.sort(
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
                        placeholder="Select Advertiser"
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
                  <CustomErrorMessage >{formik.errors.advertiser}</CustomErrorMessage>
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
                    defaultValue=""
                    placeholder="Please Enter Advertise Name"
                    id="name"
                    name="offerUrl"
                    value={formik.values.offerUrl}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage >{formik.errors.offerUrl}</CustomErrorMessage>
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
                  <Autocomplete
                    id="assignAudience"
                    forcePopupIcon
                    popupIcon={<KeyboardArrowDown />}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('audience', newValue._id)

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
                        placeholder="Select Audience"
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
                  <CustomErrorMessage >{formik.errors.audience}</CustomErrorMessage>
                </Box>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Box>
                <SecondaryHeading>Chose Conversion Tracking</SecondaryHeading>
                <FormControl variant="standard">
                  <InputLabel
                    shrink
                    htmlFor="s2sPostbackURL"
                    sx={{
                      color: "#616161",
                    }}
                  >
                    Tracking Method*
                  </InputLabel>

                  <CustomStrapInput
                    defaultValue=""
                    placeholder="Tracking Method"
                    id="tracking_method"
                    name="tracking_method"
                    value={formik.values.tracking_method}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage >{formik.errors.tracking_method}</CustomErrorMessage>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <CustomStrapButton type="submit">Add Offer</CustomStrapButton>
      </form>
    </Box>
  );
};

export default AddOffer;
