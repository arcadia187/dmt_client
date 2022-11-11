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

const Login = () => {
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

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    setUserObj((oldObj) => ({ ...oldObj, ["ip"]: res.data.IPv4 }));
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
    // const userData = await axios.post(server_url + "auth/signup", userObj);
    // if (userData.data.newUser.success === false) {
    //   navigate("/500");
    // }
    // navigate("/login");
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
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
                      <CButton type="submit" color="success">
                        Login
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
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

export default Login;
