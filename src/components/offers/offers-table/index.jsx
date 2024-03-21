import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import Loader from "ui-component/Loader";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/slices/snackbar";
import useGetOffers from "hooks/useGetOffers";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
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

const OffersTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [opendialog, setOpenDialog] = useState(false);
  const [offerData, setOfferData] = useState(null);
  const editHandler = (row) => {
    navigate("/offers/add-offer", {
      state: {
        offer: row,
      },
    });
  };
  const { data: { dataArr: offers = [] } = {}, isLoading, error } = useGetOffers();
  debugger;
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
    setOfferData(data)
  };
  const handleClose = () => {
    setOpenDialog(false);
    setOfferData(null)
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
            <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Tracking Domain</StyledTableCell>
              <StyledTableCell align="left">Unique Version</StyledTableCell>
              <StyledTableCell align="left">Conversion</StyledTableCell>
              <StyledTableCell align="left">Unique Clicks</StyledTableCell>
              <StyledTableCell align="left">Prelander Clicks</StyledTableCell>
              <StyledTableCell align="left">Prelander CTR</StyledTableCell>
              <StyledTableCell align="left">Clicks</StyledTableCell>
              <StyledTableCell align="left">CTR</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  component="th"
                  id={row.name}
                  scope="row"
                  padding="none"
                >
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-labelledby": row.name,
                    }}
                  />
                  {row?._id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.name || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.trackingDomain || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.uniqueVersion || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.conversionTracking === null ? "N/A" : row?.conversionTracking?.trackingName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.uniqueClicks || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.prelanderClicks || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.prelanderCTR || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.Clicks || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.CTR || "N/A"}
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
        <DialogTitle textAlign={"center"}>Offer Details</DialogTitle>
        <DialogContent sx={{padding:5}} >
          <Grid my={1} container display={"flex"} justifyContent={"space-between"}>
            <Grid item sm={4} xs={12} md={4}>
              <Typography textAlign={"left"} fontWeight={700}>
                Offer Name:
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12} md={8}>
              <Typography>{offerData?.name}</Typography>
            </Grid>
          </Grid>
          <Grid my={1} container display={"flex"} justifyContent={"space-between"}>
            <Grid item sm={4} xs={12} md={4}>
              <Typography textAlign={"left"} fontWeight={700}>
                Offer ID:
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12} md={8}>
              <Typography>{offerData?._id}</Typography>
            </Grid>
          </Grid>
          <Grid my={1} container display={"flex"} justifyContent={"space-between"}>
            <Grid item sm={4} xs={12} md={4}>
              <Typography textAlign={"left"} fontWeight={700}>
              Offer URL:
              </Typography>
            </Grid>
            <Grid item sm={4} xs={12} md={8}>
              <Typography>{offerData?.offerUrl}</Typography>
            </Grid>
          </Grid>
          <Grid my={1} container display={"flex"} justifyContent={"space-between"}>
            <Grid item sm={4} xs={12} md={4}>
              <Typography textAlign={"left"} fontWeight={700}>
              Pixel:
              </Typography>
            </Grid>
            <Grid item sm={4} xs={12} md={8}>
              <Typography>{offerData?.scriptUrl}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OffersTable;
