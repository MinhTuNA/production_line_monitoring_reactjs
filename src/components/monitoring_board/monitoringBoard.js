import React, { useState, useEffect, useMemo } from "react";
import "./monitoringBoard.css";
import MenuBar from "../common/navBar.js";
import SettingCherryPopup from "./popupSetting.js";
import Popup from "reactjs-popup";
import ChartPopup from "./popupChart.js";
import PopupAddNewLine from "./popupAddNewLine.js";
import PopupDelLine from "./popupDelLine.js";
import { getDataNow, getDataDay,getAuthToken } from "../../services/API_service.js";
import { fetchTables } from "../redux/actions/dataActions";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MonitoringBoard() {
  const [dateTime, setDateTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [totalTargetsSum, setTotaltargetsSum] = useState(0);
  const [totalActualsSum, setTotalActualsSum] = useState(0);
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.tableData.tables);
  const addIcon = "/img/icons/add.png";
  const navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(intervalId); // Dọn dẹp khi component bị unmount
  }, []);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDateTime = dateTime.toLocaleDateString("en-US", options);

  const handleClickType = async (tableName) => {
    try {
      let res = await getAuthToken(tableName);
      copyToClipboard(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }

  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`Copied to clipboard`);
      })
      .catch(err => {
        toast.error('Failed to copy: ', err);
      });
  };

  useEffect(() => {
    dispatch(fetchTables()); // Fetch tables when component mounts
  }, [dispatch]);

  const fetchData = async () => {
      try {
        // Gọi API để lấy dữ liệu hiện tại
        const responseNow = await getDataNow(tables);
        const fetchedDataNow = responseNow.data.data;

        // Gọi API để lấy dữ liệu theo ngày
        const responseDay = await getDataDay(tables);
        const fetchedDataDay = responseDay.data.data;

        // Định dạng lại dữ liệu
        const formattedData = fetchedDataNow.map((tableNow) => {
          // Tính tổng target trong ngày từ dữ liệu get_data_day
          const dayData = fetchedDataDay.find(
            (tableDay) => tableDay.tableName === tableNow.tableName
          );
          const totalTarget = dayData
            ? dayData.data.reduce((acc, item) => acc + (item.Target || 0), 0)
            : 0;

          const totalActual = dayData
            ? dayData.data.reduce((acc, item) => acc + (item.Actual || 0), 0)
            : 0;

          // Tính target và actual từ dữ liệu hiện tại
          const target = tableNow.data.reduce(
            (acc, item) => acc + (item.Target || 0),
            0
          );
          const actual = tableNow.data.reduce(
            (acc, item) => acc + (item.Actual || 0),
            0
          );

          return {
            type: tableNow.tableName, // hoặc tên bảng (tableNow.tableName)
            totalTarget: totalTarget,
            totalActual: totalActual,
            target: target,
            actual: actual,
          };
        });
        const sumOfTarget = formattedData.reduce(
          (acc, item) => acc + item.totalTarget,
          0
        );
        const sumOfActual = formattedData.reduce(
          (acc, item) => acc + item.totalActual,
          0
        );
        setTotaltargetsSum(sumOfTarget);
        setTotalActualsSum(sumOfActual);
        setData(formattedData);
       
      } catch (error) {
        
        
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

  useEffect(() => {
    

    // Gọi fetchData ngay khi tableNames thay đổi
    fetchData();

    // Thiết lập setInterval để cập nhật dữ liệu mỗi 1 giây
    const intervalId = setInterval(fetchData, 1000);

    // Dọn dẹp interval khi tableNames thay đổi hoặc component unmount
    return () => clearInterval(intervalId);
  }, [tables]);

  const handleDataChange = () => {
    dispatch(fetchTables);
  };
  // const data = [
  //   { type: "Cherry1", totalTarget: 222, target: 120, actual: 100 },
  //   { type: "Cherry2", totalTarget: 999, target: 100, actual: 100 },
  // ];
  const totalDiff = data.reduce(
    (sum, row) => sum + (row.actual - row.target),
    0
  );

  return (
    <div className="view">
      <div className="app-main">
        <MenuBar></MenuBar>
        <div className="title-products">
          <p>PRODUCT MONITORING SYSTEM</p>
        </div>
        <p>{formattedDateTime}</p>
        <div className="container">
          <div className="total">
            <div className="total-container">
              <p className="p-total">Target </p>
              <p className="p-value">{totalTargetsSum}</p>
            </div>
            <div className="total-container">
              <p className="p-total">Actual </p>
              <p className="p-value">{totalActualsSum}</p>
            </div>
            <div className="total-container">
              <p className="p-total">Diff </p>
              <p className="p-value">{totalDiff}</p>
            </div>
          </div>
          <div className="add-new-line-btn-container">
            <Popup
              modal
              trigger={
                <button className="add-new-line-btn">
                  <img src={addIcon} className="icon-plush" alt=""></img> &nbsp; Add new line
                </button>
              }
              closeOnDocumentClick={false}
              overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              {(close) => <PopupAddNewLine close={close} />}
            </Popup>
          </div>
          <main>
            <table className="" >
              <thead className="thead-dark" >
                <tr>
                  <th className="class-th">Type</th>
                  <th className="class-th">Total Target</th>
                  <th className="class-th">Total Actual</th>
                  <th className="class-th">Hourly Target</th>
                  <th className="class-th">Actual</th>
                  <th className="class-th">Diff</th>
                  <th className="class-th">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="class-td"> <a style={{cursor:"pointer"}} onClick={() => handleClickType(row.type)}>{row.type}</a> </td>
                    <td className="class-td">{row.totalTarget}</td>
                    <td className="class-td">{row.totalActual}</td>
                    <td className="class-td">{row.target}</td>
                    <td className="class-td">{row.actual}</td>
                    <td className="class-td">{row.actual - row.target}</td>
                    <td className="class-td">
                      <div className="d-flex justify-content-around">
                        <Popup
                          modal
                          trigger={<FontAwesomeIcon className="icon" icon="fa-solid fa-square-poll-vertical" />}
                          closeOnDocumentClick={false}
                          overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                        >
                          {(close) => (
                            <ChartPopup close={close} tableName={row.type} />
                          )}
                        </Popup>

                        <Popup
                          modal
                          trigger={<FontAwesomeIcon className="icon" icon="fa-solid fa-gear" />}
                          closeOnDocumentClick={false}
                          overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                        >
                          {(close) => (
                            <SettingCherryPopup
                              close={close}
                              Target={row.target}
                              tableName={row.type}
                            />
                          )}
                        </Popup>

                        

                        <Popup
                          modal
                          trigger={<FontAwesomeIcon className="icon" icon="fa-solid fa-trash" />}
                          closeOnDocumentClick={false}
                          overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                        >
                          {(close) => (
                            <PopupDelLine
                              close={close}
                              tableName={row.type}
                              onDataChange={handleDataChange}
                            />
                          )}
                        </Popup>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MonitoringBoard;
