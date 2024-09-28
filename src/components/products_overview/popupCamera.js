import React, { useState, useEffect, useRef } from "react";
import "./popupCamera.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCameraId } from "../../services/API_service";
import { toast } from "react-toastify";
import Chart from "./piechart";
import "bootstrap/dist/css/bootstrap.min.css";
import PopupSettingId from "./popupSettingId";
import Popup from "reactjs-popup";
import Dropdown from "react-bootstrap/Dropdown";

function PopupCamera({ close, data, title, id }) {
  const iframeRef = useRef(null); // Reference to the iframe
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState(480);
  const [showQualityMenu, setShowQualityMenu] = useState(false);


  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    
    iframe.style.zoom =
    quality === 1080
      ? 1
      : quality === 720
      ? 1.5
      : quality === 480
      ? 2.24
      : 3; // Cho 360p, tăng tỉ lệ để vừa fullscreen
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };



  const handleFullscreenChange = () => {
    
    const iframe = iframeRef.current;
    setIsFullscreen(false); // Reset fullscreen state
    if (!document.fullscreenElement) {
      handleSettingQuality(480);
      iframe.style.width = "854px";
    iframe.style.height = "480px";
    iframe.style.zoom = "0.9";
    iframe.style.border = "none";
      
    }
  };

  const handleSettingQuality = (newQuality) => {
    setQuality(newQuality);
    setShowQualityMenu(false); // Đóng menu sau khi chọn chất lượng
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const camera_url = process.env.REACT_APP_HOST_NAME;
  return (
    <div className="camera-container">
      <div className="d-flex justify-content-end mb-2">
        <Dropdown>
          <Dropdown.Toggle
            className="dropdown-toggle"
            variant="success"
            id="dropdown-basic"
          >
            <FontAwesomeIcon icon="fa-solid fa-gear" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSettingQuality(360)}>
              360p
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSettingQuality(480)}>
              480p
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSettingQuality(720)}>
              720p
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSettingQuality(1080)}>
              1080p
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="zoom-camera-container" >
        <FontAwesomeIcon
          className="zoom-camera-icon"
          icon="fa-solid fa-expand"
          onClick={handleFullscreen}
        />
        </div>
        <div className="exit-camera-container" >

        
        <FontAwesomeIcon
          onClick={close}
          className="exit-camera-icon"
          icon="fa-solid fa-xmark"
        />
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row">
        <div className="chart-container">
          <Chart data={data} title={title} />
        </div>
        <div className="video-container">
          <iframe
            ref={iframeRef}
            className={`video-feed ${isFullscreen ? "fullscreen" : ""} quality-${quality}p`}
            src={`${camera_url}/video_feed/${id}/${quality}p`}
            title={`camera ${title}`}
            style={{
              width:
                quality === 1080
                  ? "1920px"
                  : quality === 720
                  ? "1280px"
                  : quality === 480
                  ? "854px"
                  : "640px", // cho 360p
              height:
                quality === 1080
                  ? "1080px"
                  : quality === 720
                  ? "720px"
                  : quality === 480
                  ? "480px"
                  : "360px", // cho 360p
              border: "none",
              zoom:
                quality === 1080
                  ? 0.4
                  : quality === 720
                  ? 0.6
                  : quality === 480
                  ? 0.9
                  : 1.2,
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default PopupCamera;
