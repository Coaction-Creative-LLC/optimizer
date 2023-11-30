import {
  Box,
  Container,
  FormControl,
  InputLabel,
  InputBase,
  Grid,
  ButtonBase,
} from "@mui/material";
import InnerHeader from "ui-component/InnerHeader";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import useAddAdvertiser from "hooks/useCreateAdvertiser";
import { openSnackbar } from "store/slices/snackbar";
import { useDispatch } from "react-redux";
import Loader from "ui-component/Loader";
import { useState } from "react";

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  website: yup.string().required("Website URL is required"),
  notes: yup.string()
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
const CustomErrorMessage = styled(Box)(({theme})  =>({
  marginTop: "6px",
  marginRight: "20px",
  textAlign: "right",
  position:"relative",
  color: theme.palette.secondary.dark
}))
const AddAdvertiser = () => {
  const dispatch = useDispatch();
  const { addAdvertiser } = useAddAdvertiser();
  const [loader,setLoader] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      website: "",
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoader(true)
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
            setLoader(false)
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
        setLoader(false)
      }
    },
  });

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
      {loader && (<Loader />)}
      <InnerHeader title={"Add Advertiser"} text={text} />
      <form onSubmit={formik.handleSubmit}>
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
                    defaultValue=""
                    placeholder="Please Enter Advertise Name"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage >{formik.errors.name}</CustomErrorMessage>
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel shrink htmlFor="website">
                    website*
                  </InputLabel>
                  <CustomStrapInput
                    defaultValue=""
                    placeholder="Please Enter website URL"
                    id="website"
                    name="website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage >{formik.errors.website}</CustomErrorMessage>
                </FormControl>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Box>
                <FormControl variant="standard">
                  <InputLabel shrink htmlFor="website">
                    Notes
                  </InputLabel>
                  <CustomStrapTextArea
                    defaultValue=""
                    placeholder="Note"
                    multiline
                    name="notes"
                    rows={12}
                    Fvalue={formik.values.notes}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage >{formik.errors.notes}</CustomErrorMessage>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <CustomStrapButton type="submit">Add Advertiser</CustomStrapButton>
      </form>
    </Box>
  );
};

export default AddAdvertiser;
