import {Navigation} from "../components/common/Navigation";
import React, {ChangeEvent, useEffect, useState} from "react";
import {PageProps} from "../props/pageProps";
import useAuth from "../hooks/useAuth";
import {Button, Form} from "react-bootstrap";
import {SignupModel} from "../models/signupModel";
import {sign} from "crypto";
import appConstants from "../constants/appConstants";
import {Link, useNavigate} from "react-router-dom";

export const SignupPage: React.FC<PageProps> = () => {
    const {auth} = useAuth()
    const [signupItem, setSignupItem] = useState<SignupModel>({});
    const navigate = useNavigate()

    useEffect(() => {
        if (auth) {
            navigate('/dashboard')
        }
    }, []);

    const onEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value
        const signup = signupItem
        signup.email = email

        setSignupItem(signup)
    }

    const onNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        const signup = signupItem
        signup.name = name

        setSignupItem(signup)
    }

    const onPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value
        const signup = signupItem
        signup.password = password

        setSignupItem(signup)
    }

    const onSignupClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        fetch(`${appConstants.baseUrl}/register`,
            {
                method: 'POST',
                body: JSON.stringify(signupItem),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(data => {
            navigate('/login')
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <Navigation loggedIn={!!auth}/>

            <div className="page-centered">
                <Form>
                    <h1>Create an account</h1>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" onChange={onNameInput} />
                        <Form.Text className="text-muted" >

                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={onEmailInput} />
                        <Form.Text className="text-muted" >
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={onPasswordInput} />
                        <Form.Text className="text-muted" >
                            We recommend you choosing a strong password
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={onSignupClick}>
                        Sign up
                    </Button>
                    <p>Already have an account? Login <Link to={'/login'}>here :)</Link></p>
                </Form>
            </div>
        </div>
    );
};