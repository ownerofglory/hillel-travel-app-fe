import React, {useState} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavigationProps} from "../../props/navigationProps";

export const Navigation: React.FC<NavigationProps> = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Hillel Travel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {
                    loggedIn ? (
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link href="/explore">Explore</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="/setting">Login</Nav.Link>
                                <Nav.Link href="/logout">
                                    Logout
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    ) : (
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">
                                    Sing up
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    )
                }
            </Container>
        </Navbar>
    );
};