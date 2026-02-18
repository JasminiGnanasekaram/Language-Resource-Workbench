import React from "react";
import Navbar from "./Navbar.jsx";

export default function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
}
