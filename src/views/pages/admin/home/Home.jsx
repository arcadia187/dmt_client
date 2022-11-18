import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading...</div>
  </div>
);

// Containers
const DefaultLayoutAdmin = React.lazy(() =>
  import("../container/DefaultLayoutAdmin")
);

// Pages
const Login = React.lazy(() => import("../../login/Login"));
const Register = React.lazy(() => import("../../register/Register.js"));
const Page404 = React.lazy(() => import("../../page404/Page404"));
const Product = React.lazy(() => import("../product/Product"));
const Page500 = React.lazy(() => import("../../page500/Page500"));
const AddNewProduct = React.lazy(() => import("../product/AddNewProduct"));
const HomePageAdmin = React.lazy(() =>
  import("../dashBoardHomePage/HomePageAdmin")
);

export default function App() {
  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route
          exact
          path="/product"
          name="Product Page"
          element={
            <DefaultLayoutAdmin children={<Product />}></DefaultLayoutAdmin>
          }
        />
        <Route
          exact
          path="/add_product"
          name="Add New Product"
          element={
            <DefaultLayoutAdmin
              children={<AddNewProduct />}
            ></DefaultLayoutAdmin>
          }
        />
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route
          path="*"
          name="Home"
          element={
            <DefaultLayoutAdmin
              children={<HomePageAdmin />}
            ></DefaultLayoutAdmin>
          }
        />
      </Routes>
    </Suspense>
  );
}
