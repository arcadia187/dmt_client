import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./constants/configStore.js";
import { PersistGate } from "redux-persist/integration/react";
// import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);
