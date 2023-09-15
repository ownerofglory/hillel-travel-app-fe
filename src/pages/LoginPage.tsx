import {Navigation} from "../components/common/Navigation";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Form } from "react-bootstrap";
import './login-page-style.css'
import {LoginModel} from "../models/loginModel";
import {LoginPageProps} from "../props/loginPageProps";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import appConstants from "../constants/appConstants";

export const LoginPage: React.FC<LoginPageProps> = () => {
    const [loginItem, setLoginItem] = useState<LoginModel>({})
    const navigate = useNavigate()
    const {auth, setAuth} = useAuth()

    useEffect(() => {
        if (auth) {
            navigate('/dashboard')
        }
    }, []);

    const onUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value
        const login = loginItem
        login.username = username

        setLoginItem(login)
    }

    const onPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value
        const login = loginItem
        login.password = password
        setLoginItem(login)
    }

    const onLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        fetch(`${appConstants.baseUrl}/login`,
            {
                method: 'POST',
                body: JSON.stringify(loginItem),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(data => {
                setAuth(data)
                localStorage.setItem('auth', JSON.stringify(data))
                localStorage.setItem('jwt', data?.token ?? "")
                navigate('/dashboard')
            }).catch(err => console.log(err))
    }

    return (
        <div>
            <Navigation loggedIn={!!auth}/>

            <div className="page-centered">
                <Form>
                    <h1>Welcome</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={onUsernameInput} />
                        <Form.Text className="text-muted" >
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={onPasswordInput} />
                    </Form.Group>
                    <Button variant="primary" onClick={onLoginClick}>
                        Login
                    </Button>
                    <p>Don't have an account yet? Register <Link to={'/signup'}>here :)</Link></p>
                </Form>
            </div>
        </div>
    );
};