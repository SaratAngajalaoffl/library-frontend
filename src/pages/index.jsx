import React from "react";
import { Route, Routes } from "react-router-dom";

import NavbarComponent from "../components/navbar/NavbarComponent";
import DashboardPage from "./dashboard/DashboardPage";
import LoginPage from "./login/LoginPage";
import PdfReader from "./pdf/PdfReader";
import RegisterPage from "./register/RegisterPage";

const MainRouter = () => {
    return (
        <>
            <NavbarComponent />

            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/pdf" element={<PdfReader />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
};

export default MainRouter;
