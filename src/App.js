import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import DashBoardHome from "./views/pages/admin/home/Home";
import { connect } from "react-redux";

import "react-responsive-carousel/lib/styles/carousel.min.css";
const loading = (
  <div className="pt-3 text-center">
    <div className=" text-center  sk-spinner sk-spinner-pulse">Loading...</div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const ReleaseShop = React.lazy(() => import("./views/pages/release/release"));
const Cart = React.lazy(() => import("./views/pages/cart/cart"));
const Product = React.lazy(() => import("./views/pages/product/product"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const HomePage = React.lazy(() => import("./views/pages/homepage/Homepage"));
const Shop = React.lazy(() => import("./views/pages/shop/shop"));
const Verify = React.lazy(() => import("./views/pages/verify/Verify"));
const Checkout = React.lazy(() => import("./views/pages/checkout/checkout"));
function App(props) {
  console.log(props?.uservalue);
  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />

          <Route
            path="/shop"
            name="Shop"
            element={
              <DefaultLayout
                children={
                  <Shop
                    title={"Merchandise"}
                    url={`${process.env.REACT_APP_SERVER_URL}product?isFirst=1&limit=6`}
                    pagination={true}
                  />
                }
              ></DefaultLayout>
            }
          />
          <Route
            path="/checkout"
            name="Checkout"
            element={<DefaultLayout children={<Checkout />}></DefaultLayout>}
          />
          <Route
            path="/verify/:token"
            name="Verify Email"
            element={<Verify />}
          />
          <Route
            path="/admin/*"
            element={
              props?.uservalue?.role == "ADMIN" ? <DashBoardHome /> : <Login />
            }
          />

          <Route
            path="/:id"
            name="Product"
            element={<DefaultLayout children={<Product />}></DefaultLayout>}
          />
          <Route
            path="/new_releases"
            name="Release Shop"
            element={<DefaultLayout children={<ReleaseShop />}></DefaultLayout>}
          />
          <Route
            path="/cart"
            name="Cart"
            element={<DefaultLayout children={<Cart />}></DefaultLayout>}
          />

          <Route
            path="*"
            name="Home"
            element={<DefaultLayout children={<HomePage />}></DefaultLayout>}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  uservalue: state.uservalue,
  token: state.token,
});

export default connect(mapStateToProps)(App);
