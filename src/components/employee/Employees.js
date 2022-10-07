import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

import Loading from "../../assests/images/loading.gif";
import "./Employees.css";
import EmployeesTable from "./EmployeesTable";

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);

  const handleModalClose = () => setModalOpen(false);

  const getEmployees = useCallback(() => {
    setLoading(true);
    const url = process.env.REACT_APP_BASE_URL;
    axios
      .get(url)
      .then((res) => {
        setEmployees(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <>
      <header>Employee Management App</header>
      <div className="employees-list-wrapper">
        <div className="heading">
          <h1>Empoyees List</h1>
        </div>
        <Button variant="contained" onClick={() => handleModalOpen()}>
          Add Employee
        </Button>
        {loading ? (
          <img src={Loading} alt="Loading" />
        ) : (
          <div className="employees-list">
            <EmployeesTable employees={employees} getEmployees={getEmployees} />
          </div>
        )}
      </div>
    </>
  );
};
