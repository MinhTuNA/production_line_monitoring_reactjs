import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./productsOverview.css";
import ChartContainer from "./chartContainer";
import { useSelector, useDispatch } from "react-redux";
import { fetchTables } from "../redux/actions/dataActions";
import { getAllTables } from "../../services/API_service";

import MenuBar from "../common/navBar";
import { getDataNow } from "../../services/API_service";
function ProductsOverview() {
  const [dateTime, setDateTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [totalTarget, setTotalTarget] = useState(0);
  const [totalActual, setTotalActual] = useState(0);
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.tableData.tables);
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

  useEffect(() => {
    dispatch(fetchTables()); // Fetch tables when component mounts
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (tables.length === 0) return;
      try {
        const response = await getDataNow(tables);
        const fetchedData = response.data.data;
        const formattedData = fetchedData.map((table) => {
          const targetValue = table.data.reduce(
            (acc, item) => acc + (item.Target || 0),
            0
          );
          const actualValue = table.data.reduce(
            (acc, item) => acc + (item.Actual || 0),
            0
          );

          return [
            { name: "Target", value: targetValue },
            { name: "Actual", value: actualValue },
          ];
        });

        setData(formattedData);

        const totalTarget = formattedData.reduce(
          (acc, item) =>
            acc + (item.find((data) => data.name === "Target").value || 0),
          0
        );
        const totalActual = formattedData.reduce(
          (acc, item) =>
            acc + (item.find((data) => data.name === "Actual").value || 0),
          0
        );

        setTotalTarget(totalTarget);
        setTotalActual(totalActual);
      } catch (error) {
        
        
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [tables]);
  /*const data = [
    [
      { name: 'Actual', value: 60 },
      { name: 'Target', value: 100 }
    ],
  ];
  */

  return (
    <div>
      <MenuBar></MenuBar>
      <div className="title-products">
        <p>PRODUCT MONITORING SYSTEM</p>
      </div>
      <p>{formattedDateTime}</p>
      <div className="container">
        <div className="total">
          <div className="total-container">
            <p className="p-total">Target </p>
            <p className="p-value">{totalTarget}</p>
          </div>
          <div className="total-container">
            <p className="p-total">Actual </p>
            <p className="p-value">{totalActual}</p>
          </div>
          <div className="total-container">
            <p className="p-total">Diff </p>
            <p className="p-value">{totalActual - totalTarget}</p>
          </div>
        </div>
      </div>
      <div className="piechart-container">
        {data.length === 0 ? (
          <p>Không có dữ liệu để hiển thị.</p>
        ) : (
          data.map((chartData, index) => (
            <div key={index}>
              <ChartContainer data={chartData} title={tables[index]} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsOverview;
