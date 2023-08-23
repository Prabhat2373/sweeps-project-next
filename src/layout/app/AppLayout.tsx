import React from "react";
import { Navbar } from "../header/navbar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AppLayout;
