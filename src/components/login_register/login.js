import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-register.css";
import { login } from "../../services/API_service";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux"
import { setEmail,setPhoneNumber,setName,setRole,setAuth,setId } from "../redux/reducers/authReducer";

// import { useDispatch } from 'react-redux';
// import { setRole, setToken } from '../redux/reducers/authReducer';
function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loadingAPI,setLoadingAPI] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [isMobile, setIsMobile] = useState(false);
  
  const handleClearEmail = () => setEmailInput("");
  const handleTogglePassword = () => setPasswordVisible(!passwordVisible);

  // const isMobileDevice = () => {
  //   return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
  // };
  // if(localStorage.getItem("token")){
  //   navigate("/products_overview");
  // }
  

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailInput || !password) {
      toast.error("Email/Password is required!");
      return;
    }
    try {
      setLoadingAPI(true)
      let res = await login(emailInput, password);
      if (res.data.auth && res.data.token && res.data.role ) {
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('role',res.data.role)
          dispatch(setAuth())
          dispatch(setId(res.data.id));
          dispatch(setRole(res.data.role));
          dispatch(setEmail(res.data.email));
          dispatch(setPhoneNumber(res.data.phoneNumber));
          dispatch(setName(res.data.name))
          console.log(res.data.id)
          setTimeout(() => {
            navigate("/products_overview");
          }, 100);
      }
  
    } catch (error) {
      if (error.response) {
        console.error( error.response.data.message);
        toast.error(error.response.data.message)
      } else {
        console.error("Lỗi không xác định:", error.message);
        toast.error("Đã xảy ra lỗi không xác định.");
       
      }
    }
    setLoadingAPI(false)
  };

  return (
    <div className="App">
      <img className="logo" src="/img/logo-deltax.png" alt="deltax" />
      <p className="deltaxiot">DELTA X ROBOT IOT</p>
      <form
        className="form-login col-11 col-sm-3 col-md-4"
        method="POST"
        action="#"
        onSubmit={handleLogin}
      >
        <div className="input-group">
          <span className="input-icon">
            <FontAwesomeIcon icon="fa-solid fa-user" />
          </span>
          <input
            type="text"
            className="input-login"
            id="email"
            placeholder="example@gmail.com"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <span className="clear-icon" >
          <FontAwesomeIcon
            
            icon="fa-solid fa-circle-xmark"
            onClick={handleClearEmail}
          />
          </span>
        </div>
        <div className="input-group">
          <span className="input-icon">
            <FontAwesomeIcon icon="fa-solid fa-lock" />
          </span>
          <input
            type={passwordVisible ? "text" : "password"}
            className="input-login"
            id="pass"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-toggle-icon" >
          <FontAwesomeIcon
            icon="fa-solid fa-eye-slash"
            onClick={handleTogglePassword}
          />
          </span>
        </div>

        <button className="btn-login" type="submit" 
        disabled = {emailInput && password ? false : true}
        >
        {loadingAPI && <FontAwesomeIcon icon="fa-solid fa-circle-notch fa-spin" spin /> }
        &nbsp;login
        </button>
      </form>
    </div>
  );
}

export default Login;
