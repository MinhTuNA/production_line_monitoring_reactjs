import React, { useState, useEffect } from "react";
import { getCameraId, setCameraId } from "../../services/API_service";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./popupSettingId.css"
function PopupSettingId({ close, tableName }) {
  const role = localStorage.getItem("role");
  if(role !== "Admin"){
    toast.error("bạn không có quyền truy cập")
    close();
  }
  const [id, setId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await setCameraId(tableName, id);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error);
    }

    close();
  };
  useEffect(() => {
    const fetchCameraId = async () => {
      try {
        const response = await getCameraId(tableName);
        setId(response.data.id);
      } catch (err) {
        toast(err.response?.data?.error || "Lỗi khi lấy dữ liệu");
      }
    };
    if (tableName) {
      fetchCameraId();
    }
  }, [tableName]);

  return (
    <div className="setting-id-container">
      <div className="heading-setting">
        <p>Setting camera id</p>
        <FontAwesomeIcon
          onClick={close}
          className="exit-camera-icon"
          icon="fa-solid fa-xmark"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="setting-id ">
          <label id="camera-id">id:</label>
          <input
            className="camera-id"
            type="text"
            id="camera-id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="btn-setting-camera-id" >
          
        <button className="cancel-setting" type="button" onClick={close}>
          cancel
        </button>
        
        <input type="submit" className="submit-setting" value={"OK"}></input>
        </div>
      </form>
    </div>
  );
}

export default PopupSettingId;
