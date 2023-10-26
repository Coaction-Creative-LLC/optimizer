import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AddCircle, KeyboardArrowDown, Search } from "@mui/icons-material";
import { searchData, tagsData } from "./data";

const filter = createFilterOptions();

const FilterOptions = () => {
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
          options={tagsData.sort((a, b) => -b.label.localeCompare(a.label))}
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
              placeholder="Select Tag"
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
        <Button
          style={{ fontWeight: 200, height: "35px" }}
          variant="contained"
          size="small"
        >
          Apply Tag
        </Button>
        <Button
          style={{ fontWeight: 200, height: "35px" }}
          variant="contained"
          size="small"
        >
          remove tag
        </Button>
        <Autocomplete
          forcePopupIcon
          popupIcon={<KeyboardArrowDown />}
          style={{ height: "40px", width: "211px" }}
          onChange={(event, newValue) => {}}
          id="free-solo-with-text-demo"
          options={tagsData.sort((a, b) => -b.label.localeCompare(a.label))}
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
              placeholder="All Advertiser Manager"
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
          style={{ height: "40px", width: "170px" }}
          onChange={(event, newValue) => {}}
          id="free-solo-with-text-demo"
          options={tagsData.sort((a, b) => -b.label.localeCompare(a.label))}
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
              placeholder="All Advertiser Tag"
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
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={1}
      >
        <Typography variant="h5" color={"#616161"}>
          Add Advertiser
        </Typography>
        <AddCircle
          style={{
            color: theme.palette.secondary.dark,
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
};

export default FilterOptions;
