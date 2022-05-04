import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/Home.js";

import AppLayout from "./components/general/AppLayout.js";

import "./styles/index.css";

export default function App() {

  return (
    <BrowserRouter>
      <AppLayout>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Home />} />
          </Routes>
        </div>
      </AppLayout>
    </BrowserRouter>
  );
}