import React, { useState, useEffect, useRef } from "react";
import "./popupCamera.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCameraId } from "../../services/API_service";
import { toast } from "react-toastify";
import Chart from "./piechart";
import 'bootstrap/dist/css/bootstrap.min.css';

function PopupCamera({ close, data, title }) {
  const [id, setId] = useState("");
  const iframeRef = useRef(null); // Reference to the iframe
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    iframe.style.zoom = "1";
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      // For Firefox
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      // For Chrome, Safari, Opera
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      // For IE/Edge
      iframe.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullscreen(false); // Reset fullscreen state
  };

  const handleFullscreenChange = () => {
    const iframe = iframeRef.current;
    if (!document.fullscreenElement) {
      // Exiting fullscreen mode
      iframe.style.zoom = "0.40"; // Reset zoom when exiting fullscreen
      setIsFullscreen(false); // Reset fullscreen state
    }
  };

  
  useEffect(() => {
    const fetchCameraId = async () => {
      try {
        const response = await getCameraId(title);
        setId(response.data.id);
      } catch (err) {
        toast(err.response?.data?.error || "Lỗi khi lấy dữ liệu");
      }
    };
    if (title) {
      fetchCameraId();
    }
  }, [title]);

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
      <FontAwesomeIcon
        className="zoom-camera-icon"
        icon="fa-solid fa-expand"
        onClick={handleFullscreen}
      />
      <FontAwesomeIcon
        onClick={close}
        className="exit-camera-icon"
        icon="fa-solid fa-xmark"
      />
    </div>

    <div className="d-flex flex-column flex-md-row">
      <div className="chart-container">
        <Chart data={data} title={title} />
      </div>
      <div className="video-container col-md-9">
        <iframe
          ref={iframeRef}
          className={`video-feed ${isFullscreen ? "fullscreen" : ""}`}
          src={`${camera_url}/video_feed/${id}`}
          title="Camera Feed"
        ></iframe>
      </div>
    </div>
  </div>
);
}

export default PopupCamera;
