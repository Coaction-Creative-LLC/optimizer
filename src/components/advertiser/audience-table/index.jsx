import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import useGetAudience from "hooks/useGetAudience";
import Loader from "ui-component/Loader";
import { openSnackbar } from "store/slices/snackbar";
import format from "date-fns/format";
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



const AudienceTable = () => {
  const dispatch = useDispatch();
  const { data = {}, isLoading, error } = useGetAudience();
  const {data: audience =[]} = data;
  console.log(audience, 'audience')

  debugger;
  if (isLoading) {
    return (<Loader />);
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
)
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
              <StyledTableCell>Audience Name</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Time Zone</StyledTableCell>
              <StyledTableCell align="left">Currency</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audience.map((row) => (
              <StyledTableRow key={row.audienceName}>
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
                  {row.audienceName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.status ? "Enabled" : "Disabled"}</StyledTableCell>
                <StyledTableCell align="left">{ format(new Date(),'MM/d/yyyy' )}</StyledTableCell>
                <StyledTableCell align="left">{row.timeZone === "" ? "US/Pacific" : "None"}</StyledTableCell>
                <StyledTableCell align="left">{row.Currency }</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AudienceTable;
