import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";

import EmployeeDetailModal from "./EmployeeDetailModal";
import EmployeeDeleteDialog from "./EmployeeDeleteDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    fontWeight: "bold",
    border: "1px solid rgba(224, 224, 224, 1)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "1px solid rgba(224, 224, 224, 1)",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  //   "&:last-child td, &:last-child th": {
  //     border: 0,
  //   },
}));

export default function EmployeesTable({ employees }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDialogOpen = () => setDialogOpen(true);

  const handleDialogClose = () => setDialogOpen(false);

  const handleUpdate = () => {
    console.log("Fv");
  };
  const handleDelete = (id) => {
    handleDialogOpen();
    setEmployeeId(id);
  };
  const handleView = (employee) => {
    handleOpen();
    setEmployeeDetail(employee);
  };

  return (
    <Paper sx={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First name</StyledTableCell>
              <StyledTableCell>Last name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? employees.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : employees
            ).map((employee) => (
              <StyledTableRow key={employee.id}>
                <StyledTableCell>{employee.first_name}</StyledTableCell>
                <StyledTableCell>{employee.last_name}</StyledTableCell>
                <StyledTableCell>{employee.email}</StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#17A7BB" }}
                      onClick={() => handleUpdate()}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#DC3D45" }}
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#17A7BB" }}
                      onClick={() => handleView(employee)}
                    >
                      View
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, { label: "All", value: -1 }]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <EmployeeDetailModal
        open={open}
        handleClose={handleClose}
        employeeDetail={employeeDetail}
      />
      <EmployeeDeleteDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        employeeId={employeeId}
      />
    </Paper>
  );
}
