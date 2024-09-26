import React from "react";
import "./popupDel.css";
import { delEmployee } from "../../services/API_service";
import { toast } from "react-toastify";

function PopupDel({ employeeId, onDataChange, name, close }) {
  const warningIcon = "./img/icons/warning.png";
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await delEmployee(employeeId);
    console.log(response.data.message);
    toast.success(`xóa thành công ${name} `)
    onDataChange();
    close();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      document.querySelector('.btn-yes').click(); 
    }
  };

  return (
    <div className="del-container">
      <form className="class-form-del" onSubmit={handleSubmit} onKeyDown={handleKeyDown} >
        <p className="warning">
          <img className="warning-icon" src={warningIcon} alt=""></img> Confirm delete {name}
        </p>
        <button className="btn-no" type="button" id="cancel" onClick={close}>
          NO
        </button>
        <input className="btn-yes" type="submit" value="YES" />
      </form>
    </div>
  );
}

export default PopupDel;
