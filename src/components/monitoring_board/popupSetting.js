import React, { useEffect, useState } from "react";
import "./popupSetting.css";
import {
  getAuthToken,
  getCameraId,
  sendTarget,
  setCameraId,
} from "../../services/API_service";
import { toast } from "react-toastify";

function SettingCherryPopup({ close, Target, tableName }) {
  const role = localStorage.getItem("role");
  if (role !== "Admin") {
    toast.error("bạn không có quyền truy cập");
    close();
  }

  const [target, setTarget] = useState(Target);
  const [authToken, setAuthToken] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        let res = await getAuthToken(tableName);
        setAuthToken(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCameraId = async () => {
      try {
        const response = await getCameraId(tableName);
        setId(response.data);
      } catch (err) {
        toast(err.response?.data?.error || "Lỗi khi lấy dữ liệu");
      }
    };
    fetchAuthToken();
    fetchCameraId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendTarget(tableName, target);
    } catch (error) {
      console.log(
        `Lỗi: ${error.response ? error.response.data.error : error.message}`
      );
    }

    try {
      const res = await setCameraId(tableName, id);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error);
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
          <div className="input-target-container">
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
          <p className="label-input">Camera Id - Token </p>
          <div className="input-target-container">
          <input
              className="input-camera-id"
              type="text"
              id="camera-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input type="text" className="auth-token" value={authToken} readOnly />
          </div>

        </div>

        <div className="btn-setting-target-container">
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
