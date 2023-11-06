import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { KeyboardArrowDown, Search } from "@mui/icons-material";
import { actionsData, searchData, filtersData } from "./data";

const filter = createFilterOptions();

const OffersTrafficSource = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{ marginTop: "20px", marginBottom: "8px" }}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"} gap={1}>
        <Autocomplete
          forcePopupIcon
          popupIcon={<KeyboardArrowDown />}
          style={{ height: "40px", width: "211px" }}
          onChange={(event, newValue) => {}}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== "" && !isExisting) {
              filtered.push(`Add "${inputValue}"`);
            }
            return filtered;
          }}
          id="free-solo-with-text-demo"
          options={searchData.sort((a, b) => -b.label.localeCompare(a.label))}
          getOptionLabel={(option) => option.label}
          freeSolo
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.label}
            </Box>
          )}
          sx={{
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
              placeholder="Select"
              size="small"
              InputProps={{
                ...params.InputProps,
                sx: {
                  padding: 1,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.common.black
                      : theme.palette.secondary.light,
                  "& fieldset": { border: "none" },
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              style={{ height: "40px" }}
            />
          )}
        />
        <Autocomplete
          forcePopupIcon
          popupIcon={<KeyboardArrowDown />}
          style={{ height: "40px", width: "130px" }}
          onChange={(event, newValue) => {}}
          id="free-solo-with-text-demo"
          options={filtersData.sort((a, b) => -b.label.localeCompare(a.label))}
          getOptionLabel={(option) => option.label}
          freeSolo
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.label}
            </Box>
          )}
          sx={{
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
              placeholder="Filter"
              size="small"
              InputProps={{
                ...params.InputProps,
                sx: {
                  padding: 1,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.common.black
                      : theme.palette.secondary.light,
                  "& fieldset": { border: "none" },
                },
              }}
              style={{ height: "40px" }}
            />
          )}
        />
        <Autocomplete
          forcePopupIcon
          popupIcon={<KeyboardArrowDown />}
          style={{ height: "40px", width: "211px" }}
          onChange={(event, newValue) => {}}
          id="free-solo-with-text-demo"
          options={actionsData.sort((a, b) => -b.label.localeCompare(a.label))}
          getOptionLabel={(option) => option.label}
          freeSolo
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.label}
            </Box>
          )}
          sx={{
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
              placeholder="Actions"
              size="small"
              InputProps={{
                ...params.InputProps,
                sx: {
                  padding: 1,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.common.black
                      : theme.palette.secondary.light,
                  "& fieldset": { border: "none" },
                },
              }}
              style={{ height: "40px" }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default OffersTrafficSource;
