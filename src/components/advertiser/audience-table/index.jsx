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
import { Edit } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { parseISO } from "date-fns";

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


const AudienceTable = ({
  setSelectedRows,
  selectedRows,
  setOpenDialog,
  opendialog,
  setAudienceData,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { data = {}, isLoading, error } = useGetAudience();
  const { data: audience = [] } = data;

  const handleCheckboxChange = (id) => {
    // Toggle the selection of the row
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };
  const handleOpenDialog = (row) => {
    setOpenDialog(true);
    setAudienceData(row);
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
              <StyledTableCell>Audience Name</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Time Zone</StyledTableCell>
              <StyledTableCell align="left">Currency</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audience?.map((row) => (
              <StyledTableRow key={row?._id}>
                <StyledTableCell
                  component="th"
                  id={row?._id}
                  scope="row"
                  padding="none"
                >
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-labelledby": row?._id,
                    }}
                    checked={selectedRows.includes(row?._id)}
                    onChange={() => handleCheckboxChange(row?._id)}
                  />
                  {row?._id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.groupName || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.status || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.createdAt
                    ? format(parseISO(row.createdAt), "MM/d/yyyy")
                    : "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.timeZone}
                </StyledTableCell>
                <StyledTableCell align="left">{row.currency}</StyledTableCell>
                <StyledTableCell align="left">
                  <Edit
                    onClick={() => {
                      handleOpenDialog(row);
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

export default AudienceTable;
