import {Navigation} from "../components/common/Navigation";
import React, {ChangeEvent, useState} from "react";
import {Button, Form } from "react-bootstrap";
import './login-page-style.css'
import {LoginModel} from "../models/loginModel";
import {LoginPageProps} from "../props/loginPageProps";
import {AuthModel} from "../models/authModel";
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const LoginPage: React.FC<LoginPageProps> = () => {
    const [loginItem, setLoginItem] = useState<LoginModel>({})
    const navigate = useNavigate()
    const {setAuth} = useAuth()

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
        const auth: AuthModel = {token: 'token', user: {name: 'user', email: 'ee@ee.com'}}
        setAuth(auth)
        localStorage.setItem('auth', JSON.stringify(auth))
        navigate('/dashboard')
    }

    return (
        <div>
            <Navigation loggedIn={false}/>

            <div className="page-centered">
                <Form>
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
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};