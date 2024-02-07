import React from "react";
import {Route, Routes} from "react-router-dom";
import {Row, Col, ListGroup, Button, Container} from "react-bootstrap";
import Blogs from "./Blogs";
import Brands from "./Brands";
import Categories from "./Categories";
import Products from "./Products";
import Users from "./Users";
import Dashboard from "./Dashboard";

const Admin = () => {
    return (
        <Container className="my-2" fluid>
            <Row>
                <Col className="d-print-none" lg={2}>
                    <div className="p-1 bg-secondary rounded">
                        <Button className="w-100 mb-1" href="/admin/">داشبورد</Button>
                        <ListGroup className="mb-1">
                            <ListGroup.Item className="bg-secondary text-light text-center">اصلی</ListGroup.Item>
                            <ListGroup.Item action href="/admin/users" active={document.location.pathname == "/admin/users"}>کاربران</ListGroup.Item>
                        </ListGroup>
                        <ListGroup className="mb-1">
                            <ListGroup.Item className="bg-secondary text-light text-center">فروشگاه</ListGroup.Item>
                            <ListGroup.Item action href="/admin/products" active={document.location.pathname == "/admin/products"}>کالا ها</ListGroup.Item>
                            <ListGroup.Item action href="/admin/categories" active={document.location.pathname == "/admin/categories"}>دسته بندی ها</ListGroup.Item>
                            <ListGroup.Item action href="/admin/brands" active={document.location.pathname == "/admin/brands"}>برند ها</ListGroup.Item>
                        </ListGroup>
                        <ListGroup className="mb-1">
                            <ListGroup.Item className="bg-secondary text-light text-center">وبلاگ</ListGroup.Item>
                            <ListGroup.Item action href="/admin/blogs" active={document.location.pathname == "/admin/blogs"}>مطالب</ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>
                <Col lg={10}>
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="blogs" element={<Blogs />} />
                        <Route path="brands" element={<Brands />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="products" element={<Products />} />
                        <Route path="users" element={<Users />} />
                    </Routes>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;
