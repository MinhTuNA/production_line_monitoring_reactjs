import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  // const token = useSelector((state) => state.user.token);
  // const role = useSelector((state) => state.user.role);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")
  const navigate = useNavigate();
  const auth = useSelector((state)=> state.user.auth)
  useEffect(() => {
    if (!token) {
      navigate("/");
      return; // Thoát sớm nếu không có token
    }

    if (role !== "Admin") {
      toast.error("bạn không có quyền truy cập");
      navigate("/products_overview");
    }
  }, [token, navigate]); // Chỉ cần theo dõi token và navigate

  return children;
}

export default AdminRoute;
