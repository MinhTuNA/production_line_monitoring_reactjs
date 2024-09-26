import React, { useState } from "react";
import "./popupSetting.css";
import { sendTarget } from "../../services/API_service";
import { toast } from "react-toastify";

function SettingCherryPopup({ close, Target, tableName }) {

  const role = localStorage.getItem("role");
  if(role !== "Admin"){
    toast.error("bạn không có quyền truy cập")
    close();
  }

  const [target, setTarget] = useState(Target);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendTarget(tableName,target)
    } catch (error) {
      console.log(
        `Lỗi: ${error.response ? error.response.data.error : error.message}`
      );
    }
    close();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setTarget(0);
  };

  return (
    <div className="content-setting">
      <form className="form-setting" onSubmit={handleSubmit}>
        <p>Setting {tableName} </p>
        <div className="main-content-setting">
          
                <p className="label-input">Target Hourly</p>
                <div className="input-target-container" >
                  <input
                    className="input-target"
                    type="number"
                    id="target"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    required
                  />
                
                  <button
                    className="btn-reset"
                    id="resettarget"
                    onClick={handleClick}
                  >
                    Reset Target Hourly
                  </button>
                  </div>
        </div>
        <div className="btn-setting-target-container" >
        <button className="btn-cancel" id="cancel" onClick={close}>
          cancel
        </button>
        <input className="btn-submit-setting" type="submit" value="OK" />
        </div>
      </form>
    </div>
  );
}

export default SettingCherryPopup;
