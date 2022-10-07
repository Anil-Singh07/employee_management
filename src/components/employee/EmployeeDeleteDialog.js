import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function EmployeeDeleteDialog({
  open,
  handleClose,
  employeeId,
  getEmployees,
}) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = () => {
    setDeleting(true);
    const url = `${process.env.REACT_APP_BASE_URL}/${employeeId}`;
    axios
      .delete(url)
      .then((res) => {
        if (res.status === 200) {
          setDeleting(false);
          handleClose();
          setTimeout(getEmployees, 1500);
          getEmployees();
        }
      })
      .catch((err) => {
        console.log(err);
        setDeleting(false);
        handleClose();
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete ?"}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            style={{ backgroundColor: "#DC3D45" }}
            onClick={() => handleClose()}
            disabled={deleting}
          >
            No
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#17A7BB" }}
            onClick={() => handleConfirm()}
            disabled={deleting}
          >
            Yes
          </Button>
        </DialogActions>
        {deleting && (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Please wait while processing...
          </p>
        )}
      </Dialog>
    </div>
  );
}
