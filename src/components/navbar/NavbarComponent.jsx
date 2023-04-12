import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../utils/storage.utils";
import { useAuthContext } from "../contexts/AuthContext";
import LogoComponent from "../logo/LogoComponent";
import AddBookModal from "../modals/AddBookModal";
import classes from "./NavbarComponent.module.css";

const NavbarComponent = () => {
    const { isAuthLoading, authData } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <nav className={classes.main}>
            <LogoComponent />
            {!isAuthLoading && (
                <>
                    {!authData.isAuthenticated || !authData.userData ? (
                        <ul className={classes.nav_items}>
                            <li className={classes.nav_item}>
                                <Link to="/login">Login</Link>
                            </li>
                            <li className={classes.nav_item}>
                                <Link to="/register">Register</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className={classes.nav_items}>
                            <li className={classes.nav_item}>
                                Welcome, {authData.userData.fullName}
                            </li>
                            {authData.userData.isAdmin && (
                                <li className={classes.nav_item}>
                                    <Button
                                        className={classes.add_book}
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Add Book{" "}
                                    </Button>
                                </li>
                            )}
                            <li className={classes.nav_item}>
                                <Button
                                    className={classes.add_book}
                                    onClick={logoutUser}
                                >
                                    Logout
                                </Button>
                            </li>
                        </ul>
                    )}
                </>
            )}
            {isModalOpen && (
                <AddBookModal handleClose={() => setIsModalOpen(false)} />
            )}
        </nav>
    );
};

export default NavbarComponent;
