import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import useGetCampaigns from "hooks/useGetCampaigns";
import Loader from "ui-component/Loader";
import { openSnackbar } from "store/slices/snackbar";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Edit, InfoOutlined } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:
      theme.palette.mode === "dark" ? "#0C1535" : theme.palette.secondary.light,
    color:
      theme.palette.mode === "dark" ? theme.palette.secondary.light : "#0C1535",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#111936",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "td, th": {
    borderBottom: 0,
  },
}));

const CampaignTable = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [opendialog, setOpenDialog] = useState(false);
  const [campData, setCampData] = useState(null);

  const {
    data: { data: campaigns = [] } = {},
    isLoading,
    error,
  } = useGetCampaigns();

  const editHandler = (row) => {
    navigate("/campaign/add-campaign", {
      state: {
        campaign: row,
      },
    });
  };
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
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
  }
  const handleOpen = (data) => {
    setOpenDialog(true);
    setCampData(data)
  };

  const handleClose = () => {
    setOpenDialog(false);
    setCampData(null)
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 700 }}
          size="small"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
            <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Unique Version</StyledTableCell>
              <StyledTableCell align="left">Conversion</StyledTableCell>
              <StyledTableCell align="left">Unique Clicks</StyledTableCell>
              <StyledTableCell align="left">Prelander Clicks</StyledTableCell>
              <StyledTableCell align="left">Prelander CTR</StyledTableCell>
              <StyledTableCell align="left">Clicks</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell
                  component="th"
                  id={row._id}
                  scope="row"
                  padding="none"
                >
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-labelledby": row._id,
                    }}
                  />
                  {row._id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.uniqueVersion || 0}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.conversionTracking || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.uniqueClicks || 0}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.prelanderClicks || "0%"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.prelanderCTR || "0%"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.clicks || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Stack direction={"row"} gap={1}>
                    <Edit
                      onClick={() => {
                        editHandler(row);
                      }}
                      style={{
                        color: theme.palette.secondary.dark,
                        cursor: "pointer",
                      }}
                    />{" "}
                    <InfoOutlined
                      onClick={() => {
                        // editHandler(row);
                        handleOpen(row);
                      }}
                      style={{
                        color: theme.palette.secondary.dark,
                        cursor: "pointer",
                      }}
                    />{" "}
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={opendialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle textAlign={"center"}>Campaign Details</DialogTitle>
        <DialogContent sx={{padding:5}} >
          <Grid my={1} container display={"flex"} justifyContent={"space-between"}>
            <Grid item sm={4} xs={12} md={4}>
              <Typography textAlign={"left"} fontWeight={700}>
                Campaign Name:
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12} md={8}>
              <Typography>{campData?.name}</Typography>
            </Grid>
          </Grid>
          <Grid my={1} container display={"flex"} justifyContent={"space-between"}>
            <Grid item sm={4} xs={12} md={4}>
              <Typography textAlign={"left"} fontWeight={700}>
                Campaign ID:
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12} md={8}>
              <Typography>{campData?._id}</Typography>
            </Grid>
          </Grid>
          <Grid my={1} container display={"flex"} justifyContent={"space-between"}>
            <Grid item sm={4} xs={12} md={4}>
              <Typography textAlign={"left"} fontWeight={700}>
              Original URL:
              </Typography>
            </Grid>
            <Grid item sm={4} xs={12} md={8}>
              <Typography>{campData?.offerUrl}</Typography>
            </Grid>
          </Grid>
          <Grid my={1} container display={"flex"} justifyContent={"space-between"}>
            <Grid item sm={4} xs={12} md={4}>
              <Typography textAlign={"left"} fontWeight={700}>
              Tracking URL:
              </Typography>
            </Grid>
            <Grid item sm={4} xs={12} md={8}>
              <Typography>{campData?.url}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignTable;
