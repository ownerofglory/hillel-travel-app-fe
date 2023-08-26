import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

export const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Hillel Travel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Dashboard</Nav.Link>
                        <Nav.Link href="#pricing">Explore</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Login</Nav.Link>
                        <Nav.Link href="#memes">
                            Sing up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};