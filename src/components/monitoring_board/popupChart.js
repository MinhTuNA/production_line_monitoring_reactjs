import React, { useState, useEffect } from "react";
import "./popupChart.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { getDataInRange } from "../../services/API_service";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ChartPopup({ close, tableName }) {
  const utcDate = new Date();
  const [dataChart, setDataChart] = useState([]);
  const [datarcv, setDatarcv] = useState([]);
  const [dateTimeStart, setDateTimeStart] = useState(
    new Date(
      utcDate.getFullYear(),
      utcDate.getMonth() - 1,
      utcDate.getDate(),
      utcDate.getHours(),
      0,
      0,
      0
    )
  );

  const [dateTimeEnd, setDateTimeEnd] = useState(
    new Date(
      utcDate.getFullYear(),
      utcDate.getMonth(),
      utcDate.getDate(),
      utcDate.getHours(),
      0,
      0,
      0
    )
  );

  useEffect(() => {
    const fetchData = async () => {
      if (dateTimeStart && dateTimeEnd) {
        try {
          const response = await getDataInRange(
            tableName,
            dateTimeStart,
            dateTimeEnd
          );
          setDatarcv(response.data.data);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        }
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [dateTimeStart, dateTimeEnd, tableName]);

  useEffect(() => {
    
    setDataChart(
      datarcv.map((item) => ({
        Name: new Date(item.Time).toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        Time: new Date(item.Time),
        Actual: item.Actual ?? 0, // Đặt giá trị mặc định là 0 nếu Actual là null
        Target: item.Target ?? 0, // Đặt giá trị mặc định là 0 nếu Target là null
      }))
    );
  }, [datarcv]);

  const handleDateStartChange = (date) => {
    setDateTimeStart(date);
    
  };
  const handleDateEndChange = (date) => {
    setDateTimeEnd(date);
    
  };

  const now = new Date(
    utcDate.getFullYear(),
    utcDate.getMonth(),
    utcDate.getDate(),
    utcDate.getHours(),
    0,
    0,
    0
  );

  const handleZoom6h = () => {
    setDateTimeStart(
      new Date(
        utcDate.getFullYear(),
        utcDate.getMonth(),
        utcDate.getDate(),
        utcDate.getHours() - 6,
        0,
        0,
        0
      )
    );
    setDateTimeEnd(now);
  };

  const handleZoom1d = () => {
    setDateTimeStart(
      new Date(
        utcDate.getFullYear(),
        utcDate.getMonth(),
        utcDate.getDate() - 1,
        utcDate.getHours(),
        0,
        0,
        0
      )
    );
    setDateTimeEnd(now);
  };

  const handleZoom1Mth = () => {
    setDateTimeStart(
      new Date(
        utcDate.getFullYear(),
        utcDate.getMonth() - 1,
        utcDate.getDate(),
        utcDate.getHours(),
        0,
        0,
        0
      )
    );
    setDateTimeEnd(now);
  };

  const icons = {
    exitIcon: "/img/icons/exit.png",
  };

  /*
  const data = [
    { name: "time", Actual: 590, Target: 800 },
    { name: "time", Actual: 868, Target: 967 },
    { name: "time", Actual: 1397, Target: 1098 },
    { name: "time", Actual: 1480, Target: 1200 },
    { name: "time", Actual: 1520, Target: 1108 },
    { name: "time", Actual: 1400, Target: 680 },
  ];
  */

  return (
    <div className="content-history">
      <div className="container-history">
        <div className="heading-popup">
          <p className="title-popup">History {tableName} </p>
          <p className="btn-close-history" onClick={close}>
            <img src={icons.exitIcon} alt=""></img>
          </p>
        </div>
        <div className="main-content-history">
          <div className="time-contain">
            <div className="zoom-select">
              <p>Zoom: </p>
              <p className="class-select" onClick={handleZoom6h}>
                6h
              </p>
              <p className="class-select" onClick={handleZoom1d}>
                1d
              </p>
              <p className="class-select" onClick={handleZoom1Mth}>
                1Mth
              </p>
            </div>
            <div className="container-date-time">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date Time Start"
                    onChange={handleDateStartChange}
                    value={dateTimeStart}
                    ampm={false}
                    inputFormat="yyyy-MM-dd HH:00"
                    minutesStep={60}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date Time End"
                    onChange={handleDateEndChange}
                    value={dateTimeEnd}
                    ampm={false}
                    inputFormat="yyyy-MM-dd HH:00"
                    minutesStep={60}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className="col-chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart
                data={dataChart}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                  dataKey="Name"
                  tick={false}
                  label={{
                    value: "Thời gian",
                    position: "insideBottomRight",
                    offset: 0,
                  }}
                />

                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Actual" barSize={20} fill="#2caffe" />
                <Line
                  type="monotone"
                  dataKey="Target"
                  stroke="#ff7300"
                  strokeWidth={3}
                  animationDuration={1}
                  animationEasing="linear"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartPopup;
