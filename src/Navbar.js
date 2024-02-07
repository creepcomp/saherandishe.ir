import React, {Suspense} from "react";
import {Container, Image, Nav, Navbar, Offcanvas} from "react-bootstrap";
const StoreNavbar = React.lazy(() => import("./Store/StoreNavbar"));
const Authorization = React.lazy(() => import("./Account/Authorization"));
import "./Navbar.css";

const Header = () => {
    return (
        <Container className="bg-primary d-print-none" fluid>
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand href="/">
                    <Image className="me-2" src="/static/logo.png" rel="ساحراندیشه" width={25} fluid />
                    ساحراندیشه
                </Navbar.Brand>
                <Navbar.Offcanvas>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>ساحراندیشه</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="align-items-center">
                            <Nav.Item>
                                <Suspense fallback={<div>در حال بارگذاری ..</div>}>
                                    <StoreNavbar />
                                </Suspense>
                            </Nav.Item>
                            <Nav.Link href="#ContactUs">درباره ما</Nav.Link>
                            <Nav.Link href="#ContactUs">تماس با ما</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <Suspense fallback={<div>در حال بارگذاری ..</div>}>
                                <Authorization />
                            </Suspense>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Navbar.Toggle />
            </Navbar>
        </Container>
    );
};

export default Header;
