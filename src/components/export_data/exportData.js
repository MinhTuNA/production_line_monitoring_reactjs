import React, { useState,useEffect } from "react";
import MenuBar from "../common/navBar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getDataInRange } from "../../services/API_service";
import { useSelector, useDispatch } from "react-redux";
import { fetchTables } from "../redux/actions/dataActions";
import { useNavigate } from "react-router-dom";

import "./exportData.css";
function ExportData() {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.tableData.tables);
  const utcDate = new Date();
  const navigate = useNavigate();
  const [tableName, setSelectedTablename] = useState("cherry1");
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
    dispatch(fetchTables()); // Fetch tables when component mounts
  }, [dispatch]);

  const fetchData = async () => {
    if (dateTimeStart && dateTimeEnd) {
      try {
        const response = await getDataInRange(
          tableName,
          dateTimeStart,
          dateTimeEnd
        );
        exportToExcel(response.data.data, "Data");
      } catch (error) {
        localStorage.clear();
        navigate("/");
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    }
  };

  const exportToExcel = (data, fileName) => {
    // Tạo workbook và worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Chuyển đổi workbook thành file Excel
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Tạo Blob và lưu file
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  // const data = [
  //   { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  //   { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' }
  // ];

  const handleExport = async () => {
    await fetchData();
  };

  const handleDateStartChange = (date) => {
    setDateTimeStart(date);
    console.log("time start: " + date);
  };
  const handleDateEndChange = (date) => {
    setDateTimeEnd(date);
    console.log("time end: " + date);
  };

  const handleSelect = (event) => {
    setSelectedTablename(event.target.value);
  };

  return (
    <div>
      <MenuBar></MenuBar>
      <p className="title">EXPORT DATA</p>
      <div className="export-data">
        <div className="export-data-container">
          <div className="date-picker-container">
            <div className="date-time-picker">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    className="date-time-picker"
                    label="Date Time Start"
                    onChange={handleDateStartChange}
                    value={dateTimeStart}
                    ampm={false}
                    inputFormat="yyyy-MM-dd HH:00"
                    minutesStep={60}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="date-time-picker">
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
          <div className="select-container">
            <label htmlFor="options">* Select type</label>
            <br></br>
            <select id="options" value={tableName} onChange={handleSelect}>
              
              {tables.map((table, index) => (
                <option key={index} value={table}>
                  {table}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn-export" onClick={handleExport}>
          EXPORT
        </button>
      </div>
    </div>
  );
}

export default ExportData;
