import React from "react";
import Popup from "reactjs-popup";
import ChangeEmployeePopup from "./changeEmployeePopup";
import PopupDel from "./popupDel";
import "./employeesTable.css";

const EmployeesTable = ({ employees, onDataChange }) => {
  const icons = {
    deleteIcon: "/img/icons/delete.png",
    changeIcon: "/img/icons/change.png",
  };

  return (
    <div>
      <table className="employees-table" >
        <thead>
          <tr>
            <th className="heading-table ">id</th>
            <th className="heading-table" >Name</th>
            <th className="heading-table " >Email</th>
            <th className="heading-table" >PhoneNumber</th>
            <th className="heading-table">Role</th>
            <th className="heading-table">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="content-table">{emp.id}</td>
              <td className="content-table ">{emp.name}</td> 
              <td className="content-table" >{emp.email}</td>
              <td className="content-table">{emp.phoneNumber}</td>
              <td className="content-table">{emp.role}</td>
              <td className="content-table">
                <Popup
                  modal
                  trigger={
                    <img className="employee-icon" src={icons.changeIcon} alt="" ></img>
                  }
                  closeOnDocumentClick={false}
                  overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                >
                  {(close) => <ChangeEmployeePopup close={close} employeeId={emp.id} onDataChange = {onDataChange} />}
                </Popup>
                <Popup
                  modal
                  trigger={
                    <img className="employee-icon" src={icons.deleteIcon} alt="" ></img>
                  }
                  closeOnDocumentClick={false}
                  overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                >
                  {(close) => <PopupDel close={close} employeeId={emp.id} name={emp.name} onDataChange = {onDataChange} />}
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
