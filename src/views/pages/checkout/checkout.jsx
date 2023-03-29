import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./checkout.css";
import Select from "react-select";
import { countries } from "src/constants/staticData";
import Alert from "@mui/material/Alert";
import PriceCalculator from "src/components/priceCalculator/priceCalculator";
import Payment from "../../../components/payment/Payment";
import { Link } from "react-router-dom";
import createAxios from "../../../constants/variables";

const Checkout = ({ user, token, dispatch, cartTotal }) => {
  //Definging state for both the new user and the user who already has a delivery address
  const [country, setCountry] = useState(
    user?.deliveryAddress?.country ? user?.deliveryAddress?.country : null
  );
  const [state, setState] = useState(
    user?.deliveryAddress?.state ? user?.deliveryAddress?.state : null
  );
  const [fullName, setfullName] = useState(
    user?.deliveryAddress?.fullName ? user?.deliveryAddress?.fullName : null
  );
  const [mobileNumber, setmobileNumber] = useState(
    user?.deliveryAddress?.mobileNumber
      ? user?.deliveryAddress?.mobileNumber
      : null
  );
  const [flatNumber, setflatNumber] = useState(
    user?.deliveryAddress?.flatNumber ? user?.deliveryAddress?.flatNumber : null
  );
  const [buildingNumber, setbuildingNumber] = useState(
    user?.deliveryAddress?.buildingNumber
      ? user?.deliveryAddress?.buildingNumber
      : null
  );
  const [landMark, setlandMark] = useState(
    user?.deliveryAddress?.landmark ? user?.deliveryAddress?.landmark : null
  );
  const [pinCode, setpinCode] = useState(
    user?.deliveryAddress?.pincode ? user?.deliveryAddress?.pincode : null
  );
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [sum, setSum] = useState(0);
  //   useEffect(() => {
  //     // getLocation();
  //     // getCountries();
  //   }, []);

  const handleSubmit = async () => {
    if (
      !country ||
      !state ||
      !mobileNumber ||
      !flatNumber ||
      !landMark ||
      !pinCode
    ) {
      setMessage(
        "Please provide us with a complete address for a smooth delivery!"
      );
    }
    const addressObj = {
      country,
      state,
      mobileNumber,
      fullName,
      flatNumber,
      buildingNumber,
      landmark: landMark,
      pincode: pinCode,
    };

    try {
      const axiosInstance = await createAxios();
      const updateduser = await axiosInstance.post(
        `${process.env.REACT_APP_SERVER_URL}user/update-delivery-address`,
        addressObj,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const dispatchItem = updateduser.data.updatedUser;
      dispatchItem.token = token;
      setSuccess(true);
      setMessage("Noted! we'll deliver to this address.");
      window.scroll(0, 0);

      dispatch({ type: "user", value: dispatchItem });
    } catch (e) {
      console.log(e);
    }
  };

  const renderAddress = () => {
    return (
      <div>
        <form className="inputContainer">
          {renderError()}
          <div className="inputItemContainer">
            <label className="bodycopy whiteColor">Country</label>
            <Select
              options={countries}
              className="inputItem"
              defaultInputValue={country}
              onChange={(e) => {
                setCountry(e.value);
              }}
              required
            />
          </div>
          <div className="inputItemContainer">
            <label className="bodycopy whiteColor">State</label>
            <input
              type="text"
              align="right"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              required
            />
          </div>
          <div className="inputItemContainer">
            <label className="bodycopy whiteColor">Mobile Number</label>
            <input
              onChange={(e) => {
                setmobileNumber(e.target.value);
              }}
              value={mobileNumber}
              className="inputItem"
              type={"number"}
            />
          </div>
          <div className="inputItemContainer">
            <label className="bodycopy whiteColor">Full Name</label>
            <input
              className="inputItem"
              type={"text"}
              value={fullName}
              onChange={(e) => {
                setfullName(e.target.value);
              }}
            />
          </div>
          <div className="inputItemContainer">
            <label className="bodycopy whiteColor">Flat number</label>
            <input
              className="inputItem"
              type={"text"}
              value={flatNumber}
              onChange={(e) => {
                setflatNumber(e.target.value);
              }}
            />
          </div>
          <div className="inputItemContainer">
            <label className="bodycopy whiteColor">Building number</label>
            <input
              className="inputItem"
              type={"text"}
              value={buildingNumber}
              onChange={(e) => {
                setbuildingNumber(e.target.value);
              }}
            />
          </div>
          <div className="inputItemContainer">
            <label className="bodycopy whiteColor">Land Mark</label>
            <input
              className="inputItem"
              type={"text"}
              value={landMark}
              onChange={(e) => {
                setlandMark(e.target.value);
              }}
            />
          </div>
          <div className="inputItemContainer">
            <label className="bodycopy whiteColor">Set pin code</label>
            <input
              className="inputItem"
              type={"number"}
              value={pinCode}
              onChange={(e) => {
                setpinCode(e.target.value);
              }}
            />
          </div>
        </form>
        <div className="buttonContainer marginTop  ">
          <button
            className="secondryBtn"
            onClick={() => {
              handleSubmit();
            }}
          >
            Deliver to this address
          </button>
        </div>
      </div>
    );
  };

  const renderError = () => {
    if (!message) {
      return null;
    }
    return (
      <Alert
        severity={`${!success ? "error" : "success"}`}
        className="marginTop errorMessage"
        onClose={() => {
          setMessage("");
        }}
      >
        {message}
      </Alert>
    );
  };

  return (
    <div className="checkout">
      <div className="checkoutHeader">
        <div className="orderSumary marginTop">
          <div className="subhheading whiteColor">
            Total Items : <Link to={"/cart"}> {user.cart?.length}</Link>
          </div>
          <Payment
            amount={cartTotal}
            userOrder={{
              // address: user.deliveryAddress,
              products: JSON.stringify(user.cart),
            }}
            currency={user?.ip?.country_name === "India" ? "INR" : "EUR"}
          />
        </div>
      </div>

      <div className="checkoutBody">{renderAddress()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.uservalue,
    token: state.token,
    cartTotal: state.cartTotal,
  };
};
export default connect(mapStateToProps)(Checkout);
