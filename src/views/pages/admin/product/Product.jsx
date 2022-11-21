import { CButton } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Product() {
  return (
    <div>
      <Link to="/admin/add_product">
        <CButton className="albumBtn">Add New Product</CButton>
      </Link>
    </div>
  );
}
