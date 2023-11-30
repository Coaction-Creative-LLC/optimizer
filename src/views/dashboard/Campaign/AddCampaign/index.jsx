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
import { assignOffer, countiesData } from "./data";
import { useTheme } from "@mui/material/styles";
import { assignTrafficSource } from "./data";

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

const AddCampaign = () => {
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
        <MainHeading>Add Campaign</MainHeading>
        <Grid display={"flex"} gap={{ md: 4 }}>
          <Grid xs={6}>
            <Box display={"flex"} flexDirection={"column"} rowGap={3}>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="name" style={{ color: "#616161" }}>
                  Campaign Name*
                </InputLabel>
                <CustomStrapInput defaultValue="Lorem Ipsum Dolor" id="name" />
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
                  options={assignOffer.sort(
                    (a, b) => -b.title.localeCompare(a.title)
                  )}
                  getOptionLabel={(option) => option.title}
                  defaultValue={assignOffer[0]}
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
                  options={assignTrafficSource.sort(
                    (a, b) => -b.title.localeCompare(a.title)
                  )}
                  getOptionLabel={(option) => option.title}
                  defaultValue={assignTrafficSource[0]}
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
                  options={countiesData.sort(
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
                  htmlFor="s2sPostbackURL"
                  sx={{
                    color: "#616161",
                  }}
                >
                  Coast Model
                </InputLabel>

                <CustomStrapInput
                  defaultValue="S2S Postback URI"
                  id="s2sPostbackURL"
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
                  defaultValue="https://www.loremipsum.com"
                  id="website"
                />
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <CustomStrapButton>Add Campaign</CustomStrapButton>
    </Box>
  );
};

export default AddCampaign;
