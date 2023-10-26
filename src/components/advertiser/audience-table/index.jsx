import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";

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

function createData(name, status, date, timeZone, currency) {
  return { name, status, date, timeZone, currency };
}

const rows = [
  createData("Lorem Ipsum Dolor", "Enabled", "10/5/23", "US/Pacific", "USD"),
  createData("Lorem Ipsum Dolor", "Enabled", "10/5/23", "US/Pacific", "USD"),
  createData("Lorem Ipsum Dolor", "Enabled", "10/5/23", "US/Pacific", "USD"),
  createData("Lorem Ipsum Dolor", "Enabled", "10/5/23", "US/Pacific", "USD"),
  createData("Lorem Ipsum Dolor", "Enabled", "10/5/23", "US/Pacific", "USD"),
  createData(
    "Lorem Ipsum Dolor",
    "Enabled",
    "10/5/23",
    "America/Los_Angeles",
    "USD"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "Enabled",
    "10/5/23",
    "America/Los_Angeles",
    "USD"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "Enabled",
    "10/5/23",
    "America/Los_Angeles",
    "USD"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "Enabled",
    "10/5/23",
    "America/Los_Angeles",
    "USD"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "Enabled",
    "10/5/23",
    "America/Los_Angeles",
    "USD"
  ),
];

const AudienceTable = () => {
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
              <StyledTableCell>Advertiser Name</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Time Zone</StyledTableCell>
              <StyledTableCell align="left">Currency</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
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
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="left">{row.timeZone}</StyledTableCell>
                <StyledTableCell align="left">{row.currency}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AudienceTable;
