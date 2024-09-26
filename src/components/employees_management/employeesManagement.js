import React, { useState, useEffect } from "react";
import MenuBar from "../common/navBar";
import { useNavigate } from "react-router-dom";
import EmployeesTable from "./employeesTable";
import "./employeesManagement.css";
import Popup from "reactjs-popup";
import ManagementPopup from "./addEmployeePopup";
import { fetchAllEmployees } from "../../services/API_service";
function EmployeesManagement() {
  const addIcon = "/img/icons/add.png";
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const fetchEmployees = async () => {
      
      try {
        let res = await fetchAllEmployees();
        setEmployees(res.data.data); // Lưu dữ liệu vào state
      } catch (error) {
        localStorage.clear()
        navigate("/")
        console.log(error)
      }
      
  };

  useEffect(() => {
    // Hàm gọi API
    fetchEmployees();
  }, []);

  const handleDataChange = () => {
    fetchEmployees();
  };

  return (
    <div>
      <MenuBar></MenuBar>
      <p className="title">EMPLOYEES MANAGEMENT</p>
      <div className="action-table">
        <Popup
          modal
          trigger={
            <button className="btn-add-employee" >
              <img src={addIcon} className="add-icon" alt="" ></img> Add New Employee
            </button>
          }
          closeOnDocumentClick={false}
          overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          {(close) => <ManagementPopup close={close} onDataChange={handleDataChange} />}
        </Popup>
      </div>
      <div className="container">
        <EmployeesTable employees={employees} onDataChange={handleDataChange} />
      </div>
    </div>
  );
}

export default EmployeesManagement;
