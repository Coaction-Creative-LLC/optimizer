import { Grid, TextField, Stack, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import InnerHeader from "ui-component/InnerHeader";

const validationSchema = yup.object({
  default_link: yup.string().required("URL is required"),
});
const Optimizer = () => {
  const [randomUrl, setRandomUrl] = useState(null);

  const formik = useFormik({
    initialValues: {
      default_link: "",
    },
    validationSchema,
    onSubmit: async () => {
      try {
        const { data, status } = await axios.post(
          // `https://app.developmental.site/generate-url`,
          `http://localhost:4000/generate-url`,
          {
            url: formik.values.default_link,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (status === 200) {
          setRandomUrl(data.newUrl);
        }
      } catch (error) {
        console.error("Error shortening URL:", error.message);
      }
      // openSnackbar({
      //   open: true,
      //   message: "Submit Success",
      //   variant: "alert",
      //   alert: {
      //     color: "success",
      //   },
      //   close: false,
      // })
    },
  });
  const text = [
    {
      value: "Optimizer",
      url: "/optimizer",
    },
  ];
  return (
    <Box>
      <InnerHeader title={"Optimizer"} text={text} />
      <Grid container display="flex" justifyContent="center" marginTop={5}>
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <MainCard title="Optimizer">
            <form onSubmit={formik.handleSubmit}>
              <Grid container gap={5}>
                <Grid item xs={12} marginTop="20px">
                  <TextField
                    fullWidth
                    id="default_link"
                    name="default_link"
                    label="Enter Destination Url"
                    value={formik.values.default_link}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.default_link &&
                      Boolean(formik.errors.default_link)
                    }
                    helperText={
                      formik.touched.default_link && formik.errors.default_link
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent={randomUrl ? "space-between" : "flex-end"}
                  >
                    {randomUrl && (
                      <Typography variant="body2">
                        Click to Open:{" "}
                        <Typography
                          component="a"
                          href={randomUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {randomUrl}
                        </Typography>
                        {/* <Link href={randomUrl}> {randomUrl}</Link>{" "} */}
                      </Typography>
                    )}
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Optimizer;
