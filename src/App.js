import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading...</div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const HomePage = React.lazy(() => import("./views/pages/homepage/Homepage"));
const Shop = React.lazy(() => import("./views/pages/shop/shop"));
export default function App() {
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
            path="*"
            name="Home"
            element={<DefaultLayout children={<HomePage />}></DefaultLayout>}
          />
          <Route
            path="/shop"
            name="Shop"
            element={<DefaultLayout children={<Shop />}></DefaultLayout>}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
