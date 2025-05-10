import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

//import './App.css'
import "./assets/css/adminlte.css";
import "./assets/css/adminlte.min.css";
import { UserSidebar } from "./Components/layouts/UserSidebar";

import { Route, Routes } from "react-router-dom";
import  Hero  from "./Components/common/Hero";
import { Login } from "./Components/common/Login";
import { Signup } from "./Components/common/Signup";
import { AdminSidebar } from "./Components/admin/AdminSidebar";
import { AdminSignup } from "./Components/common/AdminSignup";
import ExpenseForm from "./Components/layouts/ExpenceForm";
import PieChart from "./Components/Expence/Piechart";
import Salary from "./Components/Expence/Salary";
import { ResetPassword } from "./Components/common/ResetPassword";
import History from "./Components/Expence/History";
import Daseboard from "./Components/Expence/Daseboard";
import PrivateRoute from "./Components/common/PrivateRoute";

import axios from "axios";




function App() {
  //const [count, setCount] = useState(0)
  axios.defaults.baseURL = "http://localhost:8000";

  return (
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
      <div>
        <Routes>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/resetpassword/:token" element={<ResetPassword/>}></Route>

          
          
       <Route element={<PrivateRoute />}>    
          <Route path="/dashboard" element={<Daseboard />}></Route>
          <Route path="/budget-form" element={<ExpenseForm />}></Route>
          <Route path="/budget-diagram" element={<PieChart />}></Route>
          <Route path="/salary-form" element={<Salary />}></Route>
          <Route path="/history" element={<History />}></Route>
          
        </Route>

        

          
          

          <Route path="/Adminlogin" element={<Login />}></Route>
          <Route path="/Adminsignup" element={<AdminSignup />}></Route>
          <Route path="/Admin" element={<AdminSidebar />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;