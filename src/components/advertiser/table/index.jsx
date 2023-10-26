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
  accountManager,
  login,
  website,
  tags,
  created,
  notes
) {
  return { name, accountManager, login, website, tags, created, notes };
}

const rows = [
  createData(
    "Active Sun",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 0",
    "10/5/23",
    "Note 0"
  ),
  createData(
    "Church.org.LLC",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 1",
    "10/5/23",
    "Note 1"
  ),
  createData(
    "IT Media",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 2",
    "10/5/23",
    "Note 2"
  ),
  createData(
    "Kvellz",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 3",
    "10/5/23",
    "Note 3"
  ),
  createData(
    "Perform CB",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 4",
    "10/5/23",
    "Note 4"
  ),
  createData(
    "RGR Marketing",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 5",
    "10/5/23",
    "Note 5"
  ),
  createData(
    "Madrivo",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 6",
    "10/5/23",
    "Note 6"
  ),
  createData(
    "Divvy",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 7",
    "10/5/23",
    "Note 7"
  ),
  createData(
    "Lead Pops",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 8",
    "10/5/23",
    "Note 8"
  ),
  createData(
    "Zeta Global",
    "Charlie Guerrero",
    "Login",
    "https://lorem ipsumdolor.com",
    "Tag 9",
    "10/5/23",
    "Note 9"
  ),
];

const AdvertiserTable = () => {
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
              <StyledTableCell align="left">Account Manager</StyledTableCell>
              <StyledTableCell align="left">Login</StyledTableCell>
              <StyledTableCell align="left">Website</StyledTableCell>
              <StyledTableCell align="left">Tags</StyledTableCell>
              <StyledTableCell align="left">Created</StyledTableCell>
              <StyledTableCell align="left">Notes</StyledTableCell>
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
                  {row.accountManager}
                </StyledTableCell>
                <StyledTableCell align="left">{row.login}</StyledTableCell>
                <StyledTableCell align="left">{row.website}</StyledTableCell>
                <StyledTableCell align="left">{row.tags}</StyledTableCell>
                <StyledTableCell align="left">{row.created}</StyledTableCell>
                <StyledTableCell align="left">{row.notes}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdvertiserTable;
