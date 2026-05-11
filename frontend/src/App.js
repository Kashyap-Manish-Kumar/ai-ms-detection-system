import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Analysis from "./pages/Analysis";

function App() {
  return (

    <BrowserRouter>

      <div style={{display:"flex"}}>

        <Sidebar />

        <div style={{padding:"20px", flex:1}}>

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/patients" element={<Patients />} />

            <Route path="/analysis" element={<Analysis />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;