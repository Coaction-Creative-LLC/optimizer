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

const AddAdvertiser = () => {
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
      <InnerHeader title={"Add Advertiser"} text={text} />
      <Container maxWidth="lg" style={{ marginTop: "3rem" }}>
        <MainHeading>Add Advertiser</MainHeading>
        <Grid display={"flex"} gap={{ md: 4 }}>
          <Grid xs={6}>
            <Box display={"flex"} flexDirection={"column"} rowGap={3}>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="name">
                  Name*
                </InputLabel>
                <CustomStrapInput defaultValue="Lorem Ipsum Dolor" id="name" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="website">
                  website*
                </InputLabel>
                <CustomStrapInput
                  defaultValue="Lorem Ipsum Dolor"
                  id="website"
                />
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
                  defaultValue="Lorem Ipsum Dolor"
                  multiline
                  id="website"
                  rows={12}
                />
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <CustomStrapButton>Add Advertiser</CustomStrapButton>
    </Box>
  );
};

export default AddAdvertiser;
