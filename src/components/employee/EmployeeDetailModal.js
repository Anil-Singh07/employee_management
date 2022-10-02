import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EmployeeDetailModal({
  open,
  handleClose,
  employeeDetail,
}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" component="h4">
              Employee Detail
            </Typography>
            <div sx={{ mt: 2 }}>
              <Typography variant="h6">
                First Name: {employeeDetail.first_name}
              </Typography>
              <Typography variant="h6">
                Last Name: {employeeDetail.last_name}
              </Typography>
              <Typography variant="h6">
                Email: {employeeDetail.email}
              </Typography>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
