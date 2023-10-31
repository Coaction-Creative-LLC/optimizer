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
import { advertisers } from "./data";
import { useTheme } from "@mui/material/styles";

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

const AddOffer = () => {
  const theme = useTheme();
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
  return (
    <Box sx={{ height: "100%" }}>
      <InnerHeader title={"Add Offer"} text={text} />
      <Container maxWidth="lg" style={{ marginTop: "3rem" }}>
        <MainHeading>Add Offer</MainHeading>
        <Grid display={"flex"} gap={{ md: 4 }}>
          <Grid xs={6}>
            <Box display={"flex"} flexDirection={"column"} rowGap={3}>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="name" style={{ color: "#616161" }}>
                  Name*
                </InputLabel>
                <CustomStrapInput defaultValue="Lorem Ipsum Dolor" id="name" />
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
                  onChange={(event, newValue) => {}}
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
                    (a, b) => -b.title.localeCompare(a.title)
                  )}
                  getOptionLabel={(option) => option.title}
                  freeSolo
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.title}
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
                  defaultValue="https://www.loremipsum.com"
                  id="offerURL"
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
                <Autocomplete
                  id="assignAudience"
                  forcePopupIcon
                  popupIcon={<KeyboardArrowDown />}
                  onChange={(event, newValue) => {}}
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
                    (a, b) => -b.title.localeCompare(a.title)
                  )}
                  getOptionLabel={(option) => option.title}
                  freeSolo
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.title}
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
                  defaultValue="S2S Postback URl"
                  id="s2sPostbackURL"
                />
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <CustomStrapButton>Add Offer</CustomStrapButton>
    </Box>
  );
};

export default AddOffer;
