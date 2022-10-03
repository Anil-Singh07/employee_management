import React, { usestate } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function EmployeeDeleteDialog({
  open,
  handleClose,
  employeeId,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            style={{ backgroundColor: "#DC3D45" }}
            onClick={() => handleClose()}
          >
            No
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#17A7BB" }}
            onClick={() => handleClose()}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
