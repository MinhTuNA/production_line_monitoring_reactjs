import React, { useState } from "react";
import "./popupAddNewLine.css";
import { createTable } from "../../services/API_service";
import { useDispatch } from "react-redux";
import { fetchTables } from "../redux/actions/dataActions"; // Đảm bảo import đúng action
import { toast } from "react-toastify";

function PopupAddNewLine({ close }) {
  // const [type, setType] = useState("");
  const [tableName, setTableName] = useState("");
  const role = localStorage.getItem("role");
  if(role != "Admin"){
    toast.error("bạn không có quyền truy cập")
    close();
  }
  const dispatch = useDispatch();
  const addNewLine = async (e) => {
    e.preventDefault();
    try {
      const response = await createTable(tableName);
      dispatch(fetchTables());
      // Kiểm tra phản hồi từ server
      toast.success("tạo thành công");
      console.log(response.data.message);
      close();
    } catch (error) {
      if (error.response) {
        // Server phản hồi với lỗi (ví dụ: bảng đã tồn tại)
        toast.error(error.response.data.error);
        console.log(error.response.data.error);
      } else {
        // Lỗi khác (ví dụ: không kết nối được server)
        console.log("lỗi server");
      }
    }
  };
  return (
    <div className="content-add-new-line">
      <form className="form-add-new-line" onSubmit={addNewLine}>
        <p className="title-add-new-line">Add new line </p>
        <div className="main-content-add-new-line">
          <table>
            <tbody>
              <tr>
                <td className="heading-type">Type</td>
                <td>
                  <input
                    className="input-type"
                    type="text"
                    id="tableName"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="btn-cancel" id="cancel" onClick={close}>
          cancel
        </button>
        <input className="btn-submit" type="submit" value="OK" />
      </form>
    </div>
  );
}

export default PopupAddNewLine;
