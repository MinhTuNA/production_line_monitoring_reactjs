import React,{useState} from "react";
import { toast } from "react-toastify";
import { changeInfo } from "../../services/API_service";
import { useDispatch } from "react-redux";
import { setEmail,setPhoneNumber } from "../redux/reducers/authReducer";
function PopupUser({ user, close }) {
  const id = user.id;
  const [name, setName] = useState(user.name);
  const [userPhoneNumber, setUserPhoneNumber] = useState(user.phoneNumber);
  const [userEmail, setUserEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  console.log(user);
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
      const response = await changeInfo(id,userPhoneNumber,userEmail,password);
      console.log(response.data.message);
      toast.success("thay đổi thành công");
      dispatch(setEmail(userEmail));
      dispatch(setPhoneNumber(userPhoneNumber));

      close();
    } catch (error) {
      console.error("Error:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="content-change">
      <div className="class-form-change">
        <form onSubmit={handleSubmit}>
          <p>Change Info </p>
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
                      readOnly
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
                      value={userPhoneNumber}
                      onChange={(e) => setUserPhoneNumber(e.target.value)}
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
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
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
                      disabled
                      required
                    />
                    <label htmlFor="Admin">Admin</label>
                    <input
                      type="radio"
                      id="Employee"
                      name="role"
                      value="Employee"
                      checked={role === "Employee"}
                      disabled
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

          <button
            className="btn-cancel"
            type="button"
            id="cancel"
            onClick={close}
          >
            cancel
          </button>
          <input className="btn-submit" type="submit" value="OK" />
        </form>
      </div>
    </div>
  );
}

export default PopupUser;
