import React, { useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css";
import { FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "reactjs-popup";
import PopupUser from "./popupUser";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setName,
  setPhoneNumber,
  setRole,
  clearEmail,
  clearName,
  clearPhoneNumber,
  clearRole,
  clearAuth,
  clearId,
} from "../redux/reducers/authReducer";

function MenuBar() {
  const icons = {
    exportdataIcon: "/img/icons/exportdata.png",
    humanIcon: "/img/icons/humanicon.png",
    monitoringIcon: "/img/icons/monitoring.png",
    speedIcon: "/img/icons/speed.png",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = {
    id: useSelector((state) => state.user.id),
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    phoneNumber: useSelector((state) => state.user.phoneNumber),
    role: useSelector((state) => state.user.role),
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearId());
    dispatch(clearEmail());
    dispatch(clearName());
    dispatch(clearPhoneNumber());
    dispatch(clearRole());
    dispatch(clearAuth());

    navigate("/");
    toast.success("Log out success");
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand as={Link} to="/products_overview">
        <img className="logo-deltax" src="/img/logo-deltax.png" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/products_overview">
            <img src={icons.speedIcon} alt="Speed Icon" className="menu-icon" />
            Products Overview
          </Nav.Link>
          <Nav.Link as={Link} to="/monitoring_board">
            <img
              src={icons.monitoringIcon}
              alt="Monitoring Icon"
              className="menu-icon"
            />
            Monitoring Board
          </Nav.Link>
          <Nav.Link as={Link} to="/employees_management">
            <img src={icons.humanIcon} alt="Human Icon" className="menu-icon" />
            Employees Management
          </Nav.Link>
          <Nav.Link as={Link} to="/export_data">
            <img
              src={icons.exportdataIcon}
              alt="Export Data Icon"
              className="menu-icon"
            />
            Export Data
          </Nav.Link>
          <Dropdown>
            <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components">
              <div className="user-container">
                <FaUser className="logout" />

                <>{user.name}</>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="custom-dropdown-menu">
              <Popup
                modal
                trigger={
                  <div>
                    <Dropdown.Item className="custom-dropdown-item">
                      <FontAwesomeIcon
                        className="dropdown-icon"
                        icon="fa-solid fa-address-card"
                      />
                      &nbsp; Change info
                    </Dropdown.Item>
                  </div>
                }
                closeOnDocumentClick={false}
                overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
              >
                {(close) => <PopupUser close={close} user={user} />}
              </Popup>

              <Dropdown.Item
                className="custom-dropdown-item"
                onClick={handleLogout}
              >
                <FontAwesomeIcon
                  className="dropdown-icon"
                  icon="fa-solid fa-right-from-bracket"
                />
                &nbsp; Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MenuBar;
