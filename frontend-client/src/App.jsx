import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login"  />
        <Route path="/register" element={ <Register/> } />
      </Routes>
        <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
    </div>
  );
};

export default App;
