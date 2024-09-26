import React,{useEffect} from "react";
import { Routes, Route, useNavigate,useLocation } from "react-router-dom";
import Login from "../components/login_register/login";
import ProductsOverview from "../components/products_overview/productsOverview";
import EmployeesManagement from "../components/employees_management/employeesManagement";
import ExportData from "../components/export_data/exportData";
import MonitoringBoard from "../components/monitoring_board/monitoringBoard";
import AddActual from "../components/common/addActual";
import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";
import TestGetTables from "../components/common/testGetTables";
function AppRoutes(props) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token && location.pathname === "/") {
      navigate("/products_overview"); // Điều hướng tới trang "Products Overview" nếu có token
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add_actual/*" element={<AddActual />} />
        <Route path="/test_get_tables/*" element={<TestGetTables />} />
        <Route
          path="/export_data/*"
          element={
            <AdminRoute>
              <ExportData />
            </AdminRoute>
          }
        />
        <Route
          path="/products_overview/*"
          element={
            <PrivateRoute>
              <ProductsOverview />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees_management"
          element={
            <AdminRoute>
              <EmployeesManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/monitoring_board/*"
          element={
            <PrivateRoute>
              <MonitoringBoard />
            </PrivateRoute>
          }
        />
      </Routes>

    </>
  );
}

export default AppRoutes;
