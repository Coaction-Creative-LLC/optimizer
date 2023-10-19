import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InnerHeader from "ui-component/InnerHeader";
const AddAdvertiser = () => {
  const theme = useTheme();
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
    <>
      <InnerHeader title={"Add Advertiser"} text={text} />
    </>
  );
};

export default AddAdvertiser;
