// src/Chart.js
import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import "./piechart.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const COLORS = ["#6CE86D", "#FF914D"];
const HOVER_COLORS = ["#00CC33", "#E9482B"];

const Chart = ({ data, title }) => {
  const expandIcon = "/img/icons/expand.png"
  const actualValue = data.find((entry) => entry.name === "Actual")?.value || 0;
  const targetValue = data.find((entry) => entry.name === "Target")?.value || 0;
  const diffValue = (targetValue - actualValue) * -1;
  const chartData =
    diffValue < 0
      ? [
          { name: "Value", value: actualValue },
          { name: "Value", value: diffValue * -1 }, // Hiển thị phần còn lại lên tới 100%
        ]
      : [
          { name: "Value", value: actualValue },
          { name: "Value", value: 0 },
        ];
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const getFillColor = (index) => {
    if (activeIndex === index) {
      return HOVER_COLORS[index % HOVER_COLORS.length];
    } else {
      return COLORS[index % COLORS.length];
    }
  };

  const valueClass = diffValue > 0 ? "diff-positive" : "diff-negative";

  return (
    <div>
      
      <div className="chart-heading" >
      <strong>{title}</strong>
      
      </div>
      <PieChart width={250} height={250}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(_, index) => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getFillColor(index)} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="chart-info">
        <div className="info">
          <strong className="strong-style"> Target</strong>
          <div className="Value"> {targetValue} </div>
        </div>
        <div className="info">
          <strong className="strong-style-actual"> Actual </strong>
          <div className="Value" style={{ color: "green" }}>
            {actualValue}
          </div>
        </div>
        <div className="info">
          <strong className="strong-style-diff">Diff</strong>
          <div className={`value-diff ${valueClass}`}>{diffValue}</div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
