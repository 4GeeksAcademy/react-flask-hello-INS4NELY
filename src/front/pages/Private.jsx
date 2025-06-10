import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";

export const Private = () => {
    const { logout, store } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (!token) {
            logout()
            navigate(`/`)
        }
    }, [])

    const outSession = async () => {
        logout()
        navigate(`/`)
    };

    console.log(store.user?.profile?.email);

    return (
        <div className="container-fluid">
            <div className="d-flex gap-5 position-absolute top-50 start-50 translate-middle align-items-center">
                <div className="d-flex flex-column justify-content-center gap-5">
                    <h1>Te has logeado correctamente!!!</h1>
                    <button className="btn btn-danger" onClick={() => outSession()}>Log out</button>
                </div>
                <div className="d-flex flex-column justify-content-center gap-1">
                    <h2 className="mb-4">Usuario:</h2>
                    <h4>{store.user?.profile?.name} {store.user?.profile?.last_name}</h4>
                    <h4>{store.user?.profile?.email}</h4>
                </div>
            </div>
        </div>
    );
};
