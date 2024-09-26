import React, { useState } from "react";
import "./addEmployeePopup.css";
import { addEmployee } from "../../services/API_service";
import { toast } from "react-toastify";


function ManagementPopup({ close, onDataChange }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

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
      const response = await addEmployee(name,phoneNumber,email,role,password)
      console.log(response.data.message);
      toast.success(`thêm ${name} thành công`)
      setName("");
      setEmail("");
      setPhoneNumber("");
      setRole("")
      setPassword("")

      onDataChange();
    } catch (error) {
      console.error('Error:', error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="content-setting d-flex justify-content-center ">
      <form className="class-form" onSubmit={handleSubmit}>
        <p>Create New Employee </p>
        <div className="main-content-add">
          
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
                    value={phoneNumber}
                    id="PhoneNumber"
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
  );
}

export default ManagementPopup;
