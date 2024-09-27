// src/Chart.js
import React, { useEffect, useState } from "react";
import "./piechart.css";
import Popup from "reactjs-popup";
import PopupCamera from "./popupCamera";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "./piechart";
import PopupSettingId from "./popupSettingId";
import Camera from "./camera";
import { getCameraId } from "../../services/API_service";
import { toast } from "react-toastify";

const ChartContainer = ({ data, title }) => {
  const expandIcon = "/img/icons/expand.png"
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchCameraId = async () => {
      try {
        const response = await getCameraId(title);
        setId(response.data);
      } catch (err) {
        toast(err.response?.data?.error || "Lỗi khi lấy dữ liệu");
      }
    };
    fetchCameraId();
  }, []);
  
  return (
    <div className="chart-container" >
      <div className="heading-chart" >
      <div className="action-camera" >

      
      
      <Popup
        modal
        trigger={<img className="expand-icon" src={expandIcon} ></img>}
        closeOnDocumentClick={false}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        {(close) => <PopupCamera close={close} data={data} title={title} id = {id} />}
      </Popup>
      
      {/* <Popup
        modal
        trigger={<FontAwesomeIcon className="setting-id-icon" icon="fa-solid fa-gear" />}
        closeOnDocumentClick={false}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        {(close) => <PopupSettingId close={close} tableName={title} />}
      </Popup> */}
      
      </div>
      </div>
      <div>
      <Chart data={data} title={title} />
      </div>
      
    </div>
  );
};

export default ChartContainer;
