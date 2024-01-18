import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/slices/snackbar";
import Loader from "ui-component/Loader";

import { useTheme } from "@mui/material/styles";
import { KeyboardArrowDown, Search } from "@mui/icons-material";
import { searchData, tagsData } from "./data";
import { useState } from "react";
import useCreateCampaignManually from "hooks/useCreateCampaignGroup";
import { styled } from "@mui/material/styles";

const CustomStrapInput = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    borderRadius: 12,
    padding: 6,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.common.black
        : theme.palette.secondary.light,
    height: "45px",
    flexShrink: 0,
    paddingLeft: 12,
    [theme.breakpoints.down("md")]: {
      width: "220px",
    },
    [theme.breakpoints.up("md")]: {
      width: "340px",
    },
  },
}));
const filter = createFilterOptions();

const validationSchema = yup.object({
  groupName: yup.string().required("group name is required"),
});
const AudienceFilters = ({ selectedRows , setSelectedRows}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { createCampaignGroup } = useCreateCampaignManually();

  const [opendialog, setOpenDialog] = useState(false);
  const initialValues = {
    groupName: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [loader, setLoader] = useState(false);

  const handleOpen = (data) => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const submitHandler = async (values, { resetForm }) => {
    setLoader(true);
    try {
      const result = await createCampaignGroup({ groupName: values.groupName, userIds: selectedRows} );
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
        setLoader(false);
        setSelectedRows([]);
        setOpenDialog(false);
        resetForm();
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
      setLoader(false);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between">
      {loader && <Loader />}
      <Box
        sx={{ marginTop: "20px", marginBottom: "8px" }}
        display={"flex"}
        gap={1}
      >
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
        sx={{ marginTop: "20px", marginBottom: "8px" }}
        display={"flex"}
        gap={1}
      >
        <Button
          style={{ fontWeight: 200, height: "35px" }}
          variant="contained"
          size="small"
          onClick={handleOpen}
        >
          Create Group
        </Button>
      </Box>
      <Dialog open={opendialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle textAlign={"center"}>Campaign Details</DialogTitle>
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
            enableReinitialize,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <DialogContent>
                  <Box display={"flex"} justifyContent={"center"}>
                    <FormControl variant="standard">
                      <InputLabel
                        shrink
                        htmlFor="groupName"
                        style={{ color: "#616161" }}
                      >
                        Group Name*
                      </InputLabel>
                      <CustomStrapInput
                        variant="standard"
                        defaultValue=""
                        placeholder="Please Enter Group Name"
                        id="groupName"
                        name="groupName"
                        value={values.groupName}
                        error={touched?.groupName && errors?.groupName}
                        helperText={touched?.groupName && errors?.groupName}
                        onChange={handleChange}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ fontWeight: 200, height: "35px" }}
                    variant="contained"
                    size="small"
                    type="submit"
                    color="primary"
                  >
                    Create
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default AudienceFilters;
