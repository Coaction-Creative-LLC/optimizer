import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import useGetCampaigns from "hooks/useGetCampaigns";
import Loader from "ui-component/Loader";
import { openSnackbar } from "store/slices/snackbar";

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
  const {
    data: { data: campaigns = [] } = {},
    isLoading,
    error,
  } = useGetCampaigns();
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
              <StyledTableCell align="left">Unique Version</StyledTableCell>
              <StyledTableCell align="left">Conversion</StyledTableCell>
              <StyledTableCell align="left">Unique Clicks</StyledTableCell>
              <StyledTableCell align="left">Prelander Clicks</StyledTableCell>
              <StyledTableCell align="left">Prelander CTR</StyledTableCell>
              <StyledTableCell align="left">Clicks</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((row) => (
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
                  {row.uniqueVersion || 0}
                </StyledTableCell>
                <StyledTableCell align="left">{row.conversion || 0}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.uniqueClicks || 0}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.prelanderClicks || '0%'}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.prelanderCTR || "0%"}
                </StyledTableCell>
                <StyledTableCell align="left">{row.Clicks || 0}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CampaignTable;
