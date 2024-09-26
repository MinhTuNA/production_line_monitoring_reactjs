import React, { useState, useEffect } from "react";
import { getEmployee,changeEmployee } from "../../services/API_service";
import "./changeEmployeePopup.css"
import { toast } from "react-toastify";

function ChangeEmployeePopup({ employeeId, close, onDataChange }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployee(employeeId)
        const employee = response.data;
        setName(employee.name);
        setEmail(employee.email);
        setPhoneNumber(employee.phoneNumber);
        setRole(employee.role);
      } catch (err) {
        toast(err.response?.data?.error || "Lỗi khi lấy dữ liệu");
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password.length > 0 && password.length < 6) {
      toast.error("Mật khẩu phải có tối thiểu 6 ký tự.");
      return;
    }
    if (password.includes(" ")) {
      toast.error("Mật khẩu không được chứa khoảng trắng.");
      return;
    }
    try {
      const response = await changeEmployee(employeeId,name,phoneNumber,email,role,password);
      console.log(response.data.message);
      toast.success("thay đổi thành công")
      onDataChange();
    } catch (error) {
      console.error("Error:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="content-change">
      <div className="class-form-change" >
      <form  onSubmit={handleSubmit}>
        <p>Change Info Employee </p>
        <div className="main-content-change">
          <table className="table-style">
            <tbody>
              <tr>
                <td className="td-style">
                  <label htmlFor="Name">Name</label>
                </td>
                <td className="td-style">
                  <input
                    className="input-employee"
                    type="text"
                    id="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="td-style">
                  <label htmlFor="PhoneNumber">Phone </label>
                </td>
                <td className="td-style">
                  <input
                    className="input-employee"
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    id="PhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="td-style">
                  <label htmlFor="Email">Email</label>
                </td>
                <td className="td-style">
                  <input
                    className="input-employee"
                    type="email"
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="td-style">Role</td>
                <td className="td-style">
                  <input
                    type="radio"
                    id="Admin"
                    value="Admin"
                    name="role"
                    checked={role === "Admin"}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                  <label htmlFor="Admin">Admin</label>
                  <input
                    type="radio"
                    id="Employee"
                    name="role"
                    value="Employee"
                    checked={role === "Employee"}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                  <label htmlFor="Employee">Employee</label>
                </td>
              </tr>
              <tr>
                <td className="td-style">
                  <label htmlFor="password">Password</label>
                </td>
                <td className="td-style">
                  <input
                    className="input-employee"
                    type="text"
                    id="password"
                    value={password}
                    placeholder="bỏ trống nếu không đổi mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    
                  />
                </td>
              </tr>
            </tbody>
          </table>
          
        </div>
        
        <button className="btn-cancel" type="button" id="cancel" onClick={close}>
          cancel
        </button>
        <input className="btn-submit" type="submit" value="OK" />
      </form>
      </div>
    </div>
  );
}

export default ChangeEmployeePopup;
