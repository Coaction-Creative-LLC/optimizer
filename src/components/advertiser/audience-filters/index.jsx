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
  MenuItem,
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
import TimeZones from "TimeZones";
import useUpdateCampaignGroup from "hooks/useUpdateCampaignGroup";
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
      width: "320px",
    },
    [theme.breakpoints.up("md")]: {
      width: "532px",
    },
  },
}));
const CustomStrapAutoComplete = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    position: "relative",
    borderRadius: 12,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.common.black
        : theme.palette.secondary.light,
    height: "58px",
    flexShrink: 0,
    "&:before": {
      content: "none",
    },
    "&:after": {
      content: "none",
    },
    "& .MuiSelect-icon": {
      display: "none",
    },
  },
  "& .MuiInputBase-input": {
    paddingLeft: 12,
    paddingRight: "39px",
    [theme.breakpoints.down("md")]: {
      width: "320px",
    },
    [theme.breakpoints.up("md")]: {
      width: "500px",
    },
  },
}));

const filter = createFilterOptions();

const validationSchema = yup.object({
  groupName: yup.string().required("Group name is required"),
  timeZone: yup.string().required("Time zone is required"),
});
const AudienceFilters = ({
  selectedRows,
  setSelectedRows,
  setOpenDialog,
  opendialog,
  audienceData,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { createCampaignGroup } = useCreateCampaignManually();
  const { updateCampaignGroup} = useUpdateCampaignGroup();

 const initialValues = audienceData
    ? {
        groupName: audienceData.groupName || "",
        timeZone: audienceData.timeZone || "",
      }
    : {
        groupName: "",
        timeZone: "",
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
      if (audienceData?._id) {
        // If audienceData._id exists, call useUpdateCampaignGroup
        const result = await updateCampaignGroup({
          // Pass the necessary parameters for updating
          _id: audienceData._id,
          groupName: values.groupName,
          timeZone: values.timeZone,
        });
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
          setOpenDialog(false);
          resetForm();
        }
      } else {
        // If audienceData._id doesn't exist, call useCreateCampaignGroup
        const result = await createCampaignGroup({
          groupName: values.groupName,
          timeZone: values.timeZone,
        });
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
              setOpenDialog(false);
              resetForm();
            }
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
          Create Audience
        </Button>
      </Box>
      <Dialog open={opendialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle textAlign={"center"}>Create Audience</DialogTitle>
        <Formik
          initialValues={initialValues}
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
                  <Box display={"flex"} justifyContent={"center"} gap={3}>
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
                  <Box marginTop={1}>
                    <InputLabel
                      shrink
                      htmlFor="state"
                      style={{ color: "#616161" }}
                    >
                      Time Zone
                    </InputLabel>
                    <CustomStrapAutoComplete
                      type={"text"}
                      variant="standard"
                      name="timeZone"
                      select
                      onChange={handleChange}
                      error={touched?.timeZone && Boolean(errors?.timeZone)}
                      helperText={touched?.timeZone && errors?.timeZone}
                      value={values.timeZone}
                      fullWidth
                      SelectProps={{
                        displayEmpty: true,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                        "& input": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? theme.palette.common.black
                              : theme.palette.secondary.light,
                          border: "none",
                        },
                      }}
                      InputProps={{
                        endAdornment: <KeyboardArrowDown />,
                      }}
                    >
                      <MenuItem value={""} disabled>
                        Please select a Time Zone
                      </MenuItem>
                      {TimeZones?.map((item, index) => (
                        <MenuItem
                          value={item?.abbreviation}
                          key={`${index}-categories-type-${item?.abbreviation}`}
                        >
                          {item?.zone}
                        </MenuItem>
                      ))}
                    </CustomStrapAutoComplete>
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
