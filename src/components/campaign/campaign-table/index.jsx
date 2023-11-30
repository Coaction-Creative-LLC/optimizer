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
  uniqueVersion,
  conversion,
  uniqueClicks,
  prelanderClicks,
  prelanderCTR,
  Clicks
) {
  return {
    name,
    uniqueVersion,
    conversion,
    uniqueClicks,
    prelanderClicks,
    prelanderCTR,
    Clicks,
  };
}

const rows = [
  createData(
    "KC10.3 - Daily Verse - Brazil - Mobile - Max CVR",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0"
  ),
  createData(
    "KC9.27 - Luxury SUVs - Tier 1 All - Mobile - Max CVR",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0"
  ),
  createData(
    "CH9.28 - Debt - Tier 2 - Mobile - Max CPA (CHANGED 10.3)",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0"
  ),
  createData(
    "KC9.28 - Botox V3 - Tier 2 All - Mobile - Max CVR",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0"
  ),
  createData(
    "KC10.2 - Botox V3 - Tier 1 (Except US) - Mobile - Max CVR",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0"
  ),
  createData(
    "KC9.28 - ADHD - Tier 1 All - Mobile - Max CVR",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0"
  ),
  createData(
    "KC/CDG9.21 - Patent Lawyer/Tier 2 Group",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0"
  ),
  createData(
    "CDG9.27 - Personal Loan - Tier 2 Group - Mobile",
    "0",
    "0",
    "0",
    "0%",
    "0%",
    "0"
  ),
];

const CampaignTable = () => {
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CampaignTable;
