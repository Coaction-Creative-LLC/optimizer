import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowDropDown } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

const topFilms = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "The Dark Knight",
  "12 Angry Men",
  "Schindler's List",
  "Pulp Fiction",
];
const filter = createFilterOptions();

const useStyles = makeStyles({
  root: {
    color: "white",
    height: 40,
    padding: 0,
  },
  "& fieldset": {
    border: 0,
  },
});

const FilterOptions = () => {
  const [tag, setTag] = useState("");
  const theme = useTheme();
  const classes = useStyles();

  const handleChange = (event) => {
    setTag(event.target.value);
  };
  return (
    <Box
      sx={{ marginTop: "20px", marginBottom: "8px" }}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Autocomplete
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
          options={topFilms}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option}
            </Box>
          )}
          freeSolo
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
              name="role"
              placeholder="Select Role"
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
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <ArrowDropDown sx={{ color: "text.primary" }} />
                  </InputAdornment>
                ),
              }}
              style={{ height: "40px" }}
            />
          )}
        />
        <Select
          value={tag}
          onChange={handleChange}
          displayEmpty
          className={classes.root}
          inputProps={{
            "aria-label": "Without label",
            sx: {
              padding: 1,
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.common.black
                  : theme.palette.secondary.light,
              "& fieldset": { border: "none" },
            },
          }}
        >
          <MenuItem value="">
            <em>select a tag</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Button variant="contained" size="small">
          apply tag
        </Button>
        <Button variant="contained" size="small">
          remove tag
        </Button>
        <Select
          value={tag}
          onChange={handleChange}
          displayEmpty
          className={classes.root}
          inputProps={{
            "aria-label": "Without label",
            sx: {
              padding: 1,
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.common.black
                  : theme.palette.secondary.light,
              "& fieldset": { border: "none" },
            },
          }}
        >
          <MenuItem value="">
            <em>all advertiser manager</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Select
          value={tag}
          onChange={handleChange}
          displayEmpty
          className={classes.root}
          inputProps={{
            "aria-label": "Without label",
            sx: {
              padding: 1,
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.common.black
                  : theme.palette.secondary.light,
              "& fieldset": { border: "none" },
            },
          }}
        >
          <MenuItem value="">
            <em>all advertiser tag</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
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
        <AddCircleIcon
          sx={{
            color: theme.palette.secondary.dark,
            backgroundColor: "#fff",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
};

export default FilterOptions;
