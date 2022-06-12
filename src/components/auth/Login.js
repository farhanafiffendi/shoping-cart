import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { UserContext } from '../../context/userContext';
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api'

const Login = () => {

    let navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    console.log(state);

    const [message, setMessage] = useState(null);

    const [loading, setLoading] = useState(false); //set spinner

    // Create variabel for store data with useState here ...
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    //timeout spinner
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Create function for handle insert data process with useMutation here ...
    const handleSubmit = useMutation(async (e) => {
        try {
            setLoading(true)//kondisi spinner
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post('/login', body, config);
            console.log(response);

            if (response.status === 200) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data
                })
            }
            if (response.data.data.status === 'admin') {
                navigate('/category')
            } else {
                navigate('/')
            }

            setMessage('login success')

            // Handling response here
        } catch (error) {
            setLoading(false)
            if (error.response.data.message === "Email and password incorrect") {
                // console.log(error.response.data.message);
                const alertEmail = (
                    <Alert variant="danger" className="py-1">
                        Email belum terdaftar
                    </Alert>
                );
                setMessage(alertEmail);
            } else if (error.response.data.message === "Email or Password incorrect") {
                // console.log(error.response.data.message);
                const alertEmail = (
                    <Alert variant="danger" className="py-1">
                        Email atau password salah
                    </Alert>
                );
                setMessage(alertEmail);
            } else if (error.response.data.message === "Server Error") {
                const failed = (
                    <Alert variant="danger" className="py-1">
                        Network failed
                    </Alert>
                );
                setMessage(failed);
            } else if (error.response.data.error.message === "\"email\" is not allowed to be empty") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Email tidak boleh kosong
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.error.message === "\"password\" is not allowed to be empty") {
                const failed = (
                    <Alert variant="danger" className="py-1">
                        Password tidak boleh kosong
                    </Alert>
                );
                setMessage(failed);
            }
        }
    });

    const checkAuth = () => {
        if (state.isLogin === true) {
            navigate("/");
        }
    };
    checkAuth();

    return (
        <div className='d-flex align-items-center justify-content-center vh-100 container'>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div>{message && message}</div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        value={email}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="password"
                        value={password}
                        name="password"
                        onChange={handleChange} />
                </Form.Group>
                {loading ? <>
                    <Spinner animation="border" variant="danger" />
                </> : <button className='btn btn-success' type='submit'> Click to login </button>}
            </Form>
        </div>
    )
}

export default Login
