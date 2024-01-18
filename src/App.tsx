import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Nav />
      <Routes>{routes.map((value) => value)}</Routes>
      <Footer/>
    </>
  );
}

export default App;
