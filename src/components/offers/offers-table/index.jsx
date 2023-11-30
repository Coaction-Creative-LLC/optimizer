import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import Loader from "ui-component/Loader";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/slices/snackbar";
import useGetOffers from "hooks/useGetOffers";

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
  const {
    data: { data: offers = [] } = {},
    isLoading,
    error,
  } = useGetOffers();
console.log(offers);
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
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Tracking Domain</StyledTableCell>
              <StyledTableCell align="left">Unique Version</StyledTableCell>
              <StyledTableCell align="left">Conversion</StyledTableCell>
              <StyledTableCell align="left">Unique Clicks</StyledTableCell>
              <StyledTableCell align="left">Prelander Clicks</StyledTableCell>
              <StyledTableCell align="left">Prelander CTR</StyledTableCell>
              <StyledTableCell align="left">Clicks</StyledTableCell>
              <StyledTableCell align="left">CTR</StyledTableCell>
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
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.trackingDomain || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.uniqueVersion || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">{row.conversion || "N/A"}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.uniqueClicks || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.prelanderClicks || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.prelanderCTR || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">{row.Clicks || "N/A"}</StyledTableCell>
                <StyledTableCell align="left">{row.CTR || "N/A"}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OffersTable;
