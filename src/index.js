import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/contexts/AuthContext";
import "./index.css";
import MainRouter from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <MainRouter />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
