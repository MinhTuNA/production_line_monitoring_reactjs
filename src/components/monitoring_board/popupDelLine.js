import React from "react";
import "./popupDelLine.css";
import { deleteTable } from "../../services/API_service";
import { useDispatch } from "react-redux";
import { fetchTables } from "../redux/actions/dataActions"; // Đảm bảo import đúng action
import { toast } from "react-toastify";

function PopupDelLine({ close, tableName, onDataChange }) {
  const role = localStorage.getItem("role");
  if(role !== "Admin"){
    toast.error("bạn không có quyền truy cập")
    close();
  }

  const warningIcon = "./img/icons/warning.png";
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await deleteTable(tableName);
    console.log(response.data.message);
    toast.success("xóa thành công");
    dispatch(fetchTables());
    onDataChange();
    close();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.querySelector(".btn-yes").click();
    }
  };
  return (
    <div className="del-line-container">
      <form
        className="class-form-del-line"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <p className="warning">
          <img className="warning-icon" src={warningIcon} alt=""></img> Confirm
          delete {tableName}
        </p>
        <button className="btn-no" type="button" id="cancel" onClick={close}>
          NO
        </button>
        <input className="btn-yes" type="submit" value="YES" />
      </form>
    </div>
  );
}

export default PopupDelLine;
