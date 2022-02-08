import React from "react";
import ReactDom from "react-dom";
import Layout from "./components/Layout";
import "./index.css";

const main = document.querySelector("main");

function App() {
  return <Layout />;
}

ReactDom.render(<App />, main);
