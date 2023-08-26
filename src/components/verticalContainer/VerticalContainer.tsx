import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './vertical-container-style.css'
import {VerticalContainerProps} from "../../props/verticalContainerProps";

export const VerticalContainer: React.FC<VerticalContainerProps> = ({ children }) => {
    return (
        <Container className={'vertical-container'} fluid={true}>
            <Row>
                <Col  className={'vertical-scroll-container'} >
                    {
                        children
                    }
                </Col>
            </Row>
        </Container>
    );
};