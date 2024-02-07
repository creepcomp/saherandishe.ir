import React from "react";
import {Col, Container, Row, Table} from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-primary text-light mt-auto d-print-none">
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center" sm={7}>
                        <div>
                            <span className="d-block h1 m-4">ساحراندیشه</span>
                            <Table className="align-middle" id="ContactUs">
                                <tbody>
                                    <tr>
                                        <td>
                                            <i className="fa-solid fa-location-dot" /> آدرس:
                                        </td>
                                        <td>
                                            <strong>تهران، خیابان ولیعصر، نبش خیابان بزرگمهر، پاساژ رنگین کمان، پلاک ۱</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fa-solid fa-phone" /> تلفن:
                                        </td>
                                        <td>
                                            <strong dir="ltr">+21 66952977</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fa-solid fa-envelope" /> ایمیل:
                                        </td>
                                        <td>
                                            <strong dir="ltr">saherandishe.ir@gmail.com</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fa-brands fa-telegram" /> تلگرام:
                                        </td>
                                        <td>
                                            <strong dir="ltr">@saherandishe.ir</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <iframe className="w-100 rounded my-2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.49502548312685!2d51.40520017193515!3d35.70357619325415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e010de771a095%3A0x59e9b0a12659434a!2zU2FoZXIgQW5kaXNoZWggKNiz2KfYrdix2KfZhtiv24zYtNmHKQ!5e0!3m2!1sen!2s!4v1706718213931!5m2!1sen!2s" width="500" height="300" />
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
