import React,{useEffect, useState} from "react";
import { toast } from "react-toastify";
import { getCameraId } from "../../services/API_service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Camera({ close,title }) {
  const [id, setId] = useState("");
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
  const camera_url = process.env.REACT_APP_HOST_NAME;
  return (
    <div>
      <iframe
        src={`${camera_url}${id}/?action=stream`}
        title="Camera Feed"
        style={
            {
                width: '1920px',
                height:'1280px',
            }
        }
      ></iframe>
      
    </div>
  );
}

export default Camera;
