import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import Products from "./Products";
import Blogs from "./Blogs";
import welcome from "./welcome.png";

const Home = () => {
    React.useEffect(() => {
        document.title = "فروشگاه لپ تاپ و کامپیوتر ساحراندیشه";
    }, []);

    return (
        <>
            <Container className="bg-primary text-light py-3" fluid>
                <Row>
                    <Col lg={7} className="d-flex justify-content-center align-items-center text-center">
                        <div>
                            <h1>فروشگاه لپ تاپ و کامپیوتر</h1>
                            <p>با بیش از ۳۰ سال تجربه و سابقه تخصصی در حوزه واردات انواع لپ تاپ استوک و نو در خدمت شما هستیم. همین حالا تماس بگیرید.</p>
                        </div>
                    </Col>
                    <Col>
                        <Image src={welcome} rel="ساحراندیشه" fluid />
                    </Col>
                </Row>
            </Container>
            <Col lg={10} className="mx-lg-auto m-1 my-2">
                <Products />
            </Col>
            <Container className="my-2">
                <Blogs />
            </Container>
        </>
    );
};

export default Home;
