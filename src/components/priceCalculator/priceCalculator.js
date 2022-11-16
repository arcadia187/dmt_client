import React from "react";
import { getAllInfoByISO } from "iso-country-currency";
import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const PriceCalculator = ({ price, user, dispatch, currencyRate }) => {
  const [currency, setCurrency] = useState(null);
  const country = "GR";
  const baseCurrency = "IN";
  //Fetches the ISO of the user country which is then passed to the getCounrtyCurrency to fetch the currency rate for the country
  const getCountryCurrency = () => {
    const currency = getAllInfoByISO(country);
    setCurrency(currency);
  };
  const getConvertedPrice = async () => {
    try {
      if (!currency) {
        return;
      }
      const { data } = await axios.get(
        `https://api.exchangerate.host/convert?from=${currency.currency}&to=${baseCurrency}&amount=1`
      );
      console.log(data);
      dispatch({ type: "currencyRate", payload: data.result });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCountryCurrency();
  }, []);
  useEffect(() => {
    getConvertedPrice();
  }, [currency]);
  console.log(currency);
  if (!currency) {
    return "loading";
  }
  return `${currency.symbol}${Math.ceil(price * currencyRate)}`;
};

const mapStatToProps = (state) => {
  return {
    user: state.uservalue,
    currencyRate: state.currencyRate,
  };
};

export default connect(mapStatToProps)(PriceCalculator);
