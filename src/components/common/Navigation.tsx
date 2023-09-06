import React, {useState} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavigationProps} from "../../props/navigationProps";
import {Link} from "react-router-dom";

export const Navigation: React.FC<NavigationProps> = (props) => {
    const [loggedIn, setLoggedIn] = useState(props.loggedIn)

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Hillel Travel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {
                    loggedIn ? (
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Link className={'nav-link'} to={'/dashboard'}>Dashboard</Link>
                                <Link className={'nav-link'} to={'/explore'}>Explore</Link>
                            </Nav>
                            <Nav>
                                <Link className={'nav-link'} to={'/setting'}>Settings</Link>
                                <Link className={'nav-link'} to={'/logout'}>Logout</Link>
                            </Nav>
                        </Navbar.Collapse>
                    ) : (
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                <Link className={'nav-link'} to={'/login'}>Login</Link>
                                <Link className={'nav-link'} to={'/signup'}>Sing up</Link>
                            </Nav>
                        </Navbar.Collapse>
                    )
                }
            </Container>
        </Navbar>
    );
};