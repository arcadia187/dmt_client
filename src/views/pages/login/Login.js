import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { server_url } from "src/constants/variables";
import axios from "axios";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./login.scss";
import logo from "../../../assets/Asset 2.png";
const Login = (props) => {
  let navigate = useNavigate();
  // Once submitted then show validation
  const [userObj, setUserObj] = useState("");
  const [IsOnceSubmitted, setIsOnceSubmitted] = useState(false);
  const [isValid, setValidation] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });
  const isInputValid = () => {
    return isValid.isEmailValid && isValid.isPasswordValid;
  };

  const handleForm = (e) => {
    const { target } = e;
    const name = target.name;
    const value = target.value;
    // set fields
    setUserObj((oldObj) => ({ ...oldObj, [name]: value }));
    switch (name) {
      case "email": {
        let emailExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
        if (!emailExp.test(value)) {
          setValidation((oldObj) => ({
            ...oldObj,
            ["isEmailValid"]: false,
          }));
          break;
        }

        setValidation((oldObj) => ({
          ...oldObj,
          ["isEmailValid"]: true,
        }));

        break;
      }
      case "password": {
        let passwordExp =
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!passwordExp.test(value)) {
          setValidation((oldObj) => ({
            ...oldObj,
            ["isPasswordValid"]: false,
          }));
          break;
        }
        setValidation((oldObj) => ({
          ...oldObj,
          ["isPasswordValid"]: true,
        }));
        break;
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOnceSubmitted(true);
    console.log(userObj);
    console.log(server_url);
    if (!isInputValid()) {
      console.log("invalid inputs");
      return;
    }
    try {
      const userresult = await axios.post(server_url + "auth/login", userObj);
      // console.log({ userresult });
      const userData = userresult.data;
      console.log({ userData });
      props.dispatch({ type: "user", value: userData });
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        navigate("/500");
      }
      document.getElementById("message").innerHTML = error.response.data;
    }
  };
  return (
    <div className="bg min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <p
              id="message"
              style={{ color: "red", fontSize: "18px", fontWeight: "500" }}
            ></p>
            <CCardGroup>
              <CCard
                style={{ background: "transparent", color: "white" }}
                className="p-4"
              >
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={handleForm}
                        required
                        name="email"
                        feedbackInvalid="Please provide a valid email."
                        invalid={!isValid.isEmailValid && IsOnceSubmitted}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={handleForm}
                        required={true}
                        name="password"
                        feedbackInvalid="Password should be atleast 6 characters long, with atleast 1 special character and atleast one number."
                        invalid={!isValid.isPasswordValid && IsOnceSubmitted}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton type="submit" className="secondryBtn">
                        Login
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                style={{ background: "transparent", color: "white" }}
                className="text-white py-5"
              >
                <CCardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <h2>Sign up</h2>
                    <LazyLoadImage src={logo} width="200px" alt="logo" />
                    <Link to="/register">
                      <button
                        color="primary"
                        className="secondryBtn"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </button>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  uservalue: state.uservalue,
  token: state.token,
});
export default connect(mapStateToProps)(Login);
