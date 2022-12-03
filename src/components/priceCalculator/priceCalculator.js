import React from "react";
import { getAllInfoByISO } from "iso-country-currency";
import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { server_url } from "src/constants/variables";
const PriceCalculator = ({ price, user, dispatch, currencyRate }) => {
  const getCurrencyRate = async () => {
    try {
      if (!currencyRate) {
        const { data } = await axios.get(`${server_url}currency/EUR`);
        dispatch({ type: "currencyRate", payload: data.data.rate });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCurrencyRate();
  }, []);
  // console.log(user.ip.country_name);
  if (!currencyRate) {
    return "loading";
  } else {
    if (user.ip.country_name === "India") {
      return `₹${price}`;
    } else {
      return `€${Math.ceil(price / currencyRate)}`;
    }
  }
};

const mapStatToProps = (state) => {
  return {
    user: state.uservalue,
    currencyRate: state.currencyRate,
  };
};

export default connect(mapStatToProps)(PriceCalculator);
