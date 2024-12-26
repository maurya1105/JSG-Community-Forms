import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FormA from "./components/formA";
import FormB from "./components/formB";
import FormADataTable from "./components/FormADataTable";
import FormBDataTable from "./components/FormBDataTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form-a" element={<FormA />} />
        <Route path="/form-b" element={<FormB />} />
        {/* <Route path="/form-a-data" element={<FormADataTable />} /> */}
        {/* <Route path="/form-b-data" element={<FormBDataTable />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
