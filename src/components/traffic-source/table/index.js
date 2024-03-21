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
import { format, parseISO } from "date-fns";
import { Edit } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import useGetTrafficSource from "hooks/useGetTrafficSources";

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

const TrafficSourceTable = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: { data: trafficSource = [] } = {},
  isLoading,error,} =useGetTrafficSource();

  const editHandler = (row) => {
    navigate("/traffic-source/add-source", {
      state: {
        source: row,
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
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Created At</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trafficSource.map((row) => (
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
                  {row._id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.name || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.description || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                {row.createdAt
                    ? format(parseISO(row.createdAt), "MM/d/yyyy")
                    : "N/A"}
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TrafficSourceTable;
