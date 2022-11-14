import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAuthGobalContext } from "../context/AuthContext";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout, uploadProductFile } = useAuthGobalContext();
  console.log(user.image);
  return (
    <Wrapper>
      <div className="nav-center">
        <img src={logo} alt="jobs app" />
        {user && (
          <div className="btn-container">
            <input type="file" hidden id="ih" onChange={uploadProductFile} />
            <label htmlFor="ih">
              {user.image ? (
                <img
                  src={user.image}
                  alt="profile Image"
                  style={{
                    width: "100px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                />
              ) : (
                <FaUserCircle
                  style={{ width: "40px", height: "50px", margin: "auto" }}
                />
              )}
            </label>
            <button className="btn" onClick={() => setShowLogout(true)}>
              {user.name || user}
              <FaCaretDown />
            </button>
            <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
              <button onClick={logout} className="dropdown-btn">
                logout
              </button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--white);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    transition: var(--transition);
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
`;

export default Navbar;
