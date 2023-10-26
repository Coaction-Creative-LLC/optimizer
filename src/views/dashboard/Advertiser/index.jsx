import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  createFilterOptions,
} from "@mui/material";
import React from "react";
import InnerHeader from "ui-component/InnerHeader";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowDropDown } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { FilterOptions } from "components/advertiser";

const text = [
  {
    value: "Advertiser",
    url: "/advertiser",
  },
];

const MainAdvertiser = () => {
  const theme = useTheme();

  return (
    <div>
      <InnerHeader title={"Advertiser"} text={text} />
      <FilterOptions />
    </div>
  );
};

export default MainAdvertiser;
