import React, { useState } from "react";
import { addActual } from "../../services/API_service";
const AddActual = () => {
  const [actual, setActual] = useState("");
  const [tableName, setTableName] = useState("cherry1");
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hlcnJ5NCIsImlhdCI6MTcyNTg3MzAxN30.Uu2fhhtGOhY7XWXE3Zzb0KLK0xvwO2E9L2PTM8T3FPQ")
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await addActual(tableName, actual, token);
      console.log(response.message); 
      setMessage(response.message);
    } catch (error) {
      console.error('Error submitting actual data:', error);
      setMessage(error);
    }
  };

  return (
    <div>
      <h2>Gửi dữ liệu sản lượng</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sản lượng thực tế:</label>
          <input
            type="number"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Chọn bảng:</label>
          <select value={tableName} onChange={(e) => {
            setTableName(e.target.value)
          }}>
            <option value="cherry1">Cherry 1</option>
            <option value="cherry2">Cherry 2</option>
            <option value="cherry3">Cherry 3</option>
            <option value="cherry4">Cherry 4</option>
          </select>
        </div>

        <button type="submit">Gửi</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddActual;
