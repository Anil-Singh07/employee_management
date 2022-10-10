import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Alerts from "../notifications/Alerts";

export default function EmployeeDeleteDialog({
  open,
  handleClose,
  employeeId,
  getEmployees,
}) {
  const [deleting, setDeleting] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleConfirm = () => {
    setDeleting(true);
    const url = `${process.env.REACT_APP_BASE_URL}/${employeeId}`;
    axios
      .delete(url)
      .then((res) => {
        if (res.status === 200) {
          setOpenAlert(true);
          setAlertType("success");
          setAlertMessage("Employee Deleted Successfully");
          setDeleting(false);
          handleClose();
          setTimeout(getEmployees, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpenAlert(true);
        setAlertType("error");
        setAlertMessage("Something went wrong");
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
      <Alerts
        open={openAlert}
        setOpen={setOpenAlert}
        alertType={alertType}
        alertMessage={alertMessage}
      />
    </div>
  );
}
