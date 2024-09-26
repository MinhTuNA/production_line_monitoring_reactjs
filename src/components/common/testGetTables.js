import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllTables } from '../../services/API_service';

function TestGetTables() {
  const [tables, setTables] = useState([]);

  // Hàm gọi API để lấy danh sách các bảng sử dụng Axios
  const fetchTables = async () => {
    try {
      const response = await getAllTables();
      setTables(response.data.tables);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="App">
      <h1>Danh sách các bảng trong MySQL</h1>
      <ul>
        {tables.map((table, index) => (
          <li key={index}>{table}</li>
        ))}
      </ul>
    </div>
  );
}

export default TestGetTables;
