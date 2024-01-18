import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Checkbox } from "@mui/material";
import useGetAdvertisers from "hooks/useGetetAdvertisers";
import Loader from "ui-component/Loader";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/slices/snackbar";
import { format, parse, parseISO } from "date-fns";
import { Edit } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

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

const AdvertiserTable = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const editHandler = (row) => {
    navigate('/advertiser/add-advertiser', {
      state: {
        advertiser: row,
      },
    });
  };
  const { data, isLoading, error } = useGetAdvertisers();
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
              <StyledTableCell align="left">Account Manager</StyledTableCell>
              <StyledTableCell align="left">Login</StyledTableCell>
              <StyledTableCell align="left">Website</StyledTableCell>
              <StyledTableCell align="left">Tags</StyledTableCell>
              <StyledTableCell align="left">Created</StyledTableCell>
              <StyledTableCell align="left">Notes</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.advertisers.map((row) => (
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
                  {row.accountManager || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.login || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">{row.website}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.tags || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.createdAt
                    ? format(parseISO(row.createdAt), "MM/d/yyyy")
                    : "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.note || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Edit
                    onClick={() => {
                      editHandler(row);
                    }}
                    style={{
                      color: theme.palette.secondary.dark,
                      cursor: "pointer",
                    }}
                  />{" "}
                </StyledTableCell>
                {/* <StyledTableCell align="left">{row.note || 'N/A'}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdvertiserTable;
