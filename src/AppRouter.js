import HomeScreen from "./pages/HomeScreen";
import Login from './components/auth/Login';
import { CartShop } from "./components/CartShop";

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';
import { setAuthToken, API } from './config/api';
import { Routes, Route, useNavigate } from "react-router-dom";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

export const AppRouter = () => {
    let navigate = useNavigate();

    // Init user context here ...
    const [state, dispatch] = useContext(UserContext)

    useEffect(() => {
        // Redirect Auth
        if (state.isLogin === false) {
            navigate('/auth');
        } else {
            if (state.user.status === 'admin') {
                navigate('/category');
            } else if (state.user.status === 'customer') {
                navigate('/');
            }
        }
    }, [state]);

    console.log(state);


    // Create function for check user token here ...
    const checkUser = async () => {
        try {
            const response = await API.get('/check');

            // If the token incorrect
            if (response.status === 404) {
                return dispatch({
                    type: 'AUTH_ERROR',
                });
            }

            // Get user data
            let payload = response.data.data.user;
            // Get token from local storage
            payload.token = localStorage.token;

            // Send data to useContext
            dispatch({
                type: 'USER_SUCCESS',
                payload,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);


    return (
        <Routes>
            <Route path='/auth' element={<Login />} />
            <Route path='/' element={<HomeScreen />} />
        </Routes>

    );
}
