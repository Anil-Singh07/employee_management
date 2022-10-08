import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";

import Loading from "../../assests/images/loading.gif";

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

export default function AddUpdateEmployeeModal({
  open,
  handleClose,
  employeeId,
  getEmployees,
}) {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [res, setRes] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmiting(true);
    const url = process.env.REACT_APP_BASE_URL;
    if (!employeeId) {
      axios
        .post(url, data)
        .then((res) => {
          setSubmiting(false);
          handleCancel();
          getEmployees();
        })
        .catch((err) => {
          console.log(err);
          setSubmiting(false);
          handleCancel();
        });
    } else {
      axios
        .put(`${url}/${employeeId}`, data)
        .then((res) => {
          if (res.status === 200) {
            setSubmiting(false);
            handleCancel();
            setTimeout(getEmployees, 1500);
          }
        })
        .catch((err) => {
          console.log(err);
          setSubmiting(false);
          handleCancel();
        });
    }
  };

  const handleCancel = () => {
    if (!employeeId) {
      setData({
        first_name: "",
        last_name: "",
        email: "",
      });
    } else {
      setData({
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
      });
    }
    handleClose();
  };

  useEffect(() => {
    if (employeeId) {
      setLoading(true);
      const url = `${process.env.REACT_APP_BASE_URL}/${employeeId}`;
      axios
        .get(url)
        .then((res) => {
          setData({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
          });
          setLoading(false);
          setRes(res.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [employeeId]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" component="h4">
              {!employeeId ? "Add" : "Update"} Employee
            </Typography>
            {loading ? (
              <img
                src={Loading}
                alt="Loading"
                style={{ display: "block", margin: "auto" }}
              />
            ) : (
              <Box component="form" sx={{ mt: 2 }} autoComplete="off">
                <TextField
                  required
                  id="filled-required"
                  label="First Name"
                  value={data.first_name}
                  onChange={(e) =>
                    setData({ ...data, first_name: e.target.value })
                  }
                  variant="filled"
                  fullWidth
                />
                <TextField
                  required
                  id="filled-required"
                  label="Last Name"
                  value={data.last_name}
                  onChange={(e) =>
                    setData({ ...data, last_name: e.target.value })
                  }
                  variant="filled"
                  fullWidth
                />
                <TextField
                  required
                  id="filled-required"
                  label="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  variant="filled"
                  fullWidth
                />
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 2, justifyContent: "center" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#808080" }}
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </Button>
                </Stack>
                {submiting && (
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: "15px",
                    }}
                  >
                    Please wait while processing...
                  </p>
                )}
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
