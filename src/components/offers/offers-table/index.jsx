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

function createData(
  name,
  trackingDomain,
  uniqueVersion,
  conversion,
  uniqueClicks,
  prelanderClicks,
  prelanderCTR,
  Clicks,
  CTR
) {
  return {
    name,
    trackingDomain,
    uniqueVersion,
    conversion,
    uniqueClicks,
    prelanderClicks,
    prelanderCTR,
    Clicks,
    CTR,
  };
}

const rows = [
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
  createData(
    "Lorem Ipsum Dolor",
    "https//:www.lorem ipsum.com",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0",
    "0.0%"
  ),
];

const OffersTable = () => {
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
                <StyledTableCell align="left">
                  {row.trackingDomain}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.uniqueVersion}
                </StyledTableCell>
                <StyledTableCell align="left">{row.conversion}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.uniqueClicks}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.prelanderClicks}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.prelanderCTR}
                </StyledTableCell>
                <StyledTableCell align="left">{row.Clicks}</StyledTableCell>
                <StyledTableCell align="left">{row.CTR}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OffersTable;
