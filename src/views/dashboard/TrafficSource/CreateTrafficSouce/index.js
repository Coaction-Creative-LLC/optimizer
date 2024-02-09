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
import { useTheme } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "ui-component/Loader";
import { useLocation } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  advertiser: yup.string().required("Advertisor is required"),
  offerUrl: yup.string().required("URL is Required"),
  audience: yup.string().required("Audience is Required"),
  tracking_method: yup.string(),
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
const CustomStrapButton = styled(ButtonBase)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.secondary.dark
      : theme.palette.secondary.light,
  height: "42px",
  //   width: "140.967px",
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

const CreateTrafficSource = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    description: "",
  };
  const [loader, setLoader] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  const text = [
    {
      value: "Traffic Source",
      url: "/offers",
    },
    {
      value: "Create Traffic Source",
      url: "/traffic-source/add-source",
    },
  ];

  useEffect(() => {
    if (state && state.source && state.source._id) {
      setFormInitialValues();
    }
  }, [state]);
  const setFormInitialValues = () => {
    setFormValues((prev) => ({
      ...prev,
      name: "",
      description: "",
    }));
  };

  return (
    <Box sx={{ height: "100%" }}>
      {loader && <Loader />}
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
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
              <InnerHeader title={"Create Traffic Source"} text={text} />
              <Container maxWidth="lg" style={{ marginTop: "3rem" }}>
                <MainHeading sx={{ display: "flex", justifyContent: "center" }}>
                  Create Traffic Source
                </MainHeading>
                <Grid
                  display={"flex"}
                  justifyContent={"center"}
                  gap={{ md: 4 }}
                >
                  <Grid xs={12}>
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
                      <FormControl variant="standard">
                        <InputLabel
                          shrink
                          htmlFor="description"
                          sx={{
                            color: "#616161",
                          }}
                        >
                          Description
                        </InputLabel>
                        <CustomStrapInput
                          variant="standard"
                          defaultValue=""
                          placeholder="Please Enter Offer URL"
                          id="description"
                          name="description"
                          value={values.description}
                          error={touched?.description && errors?.description}
                          helperText={
                            touched?.description && errors?.description
                          }
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
              <CustomStrapButton sx={{ paddingX: 2}} type="submit">
                Create Traffic Source
              </CustomStrapButton>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateTrafficSource;
