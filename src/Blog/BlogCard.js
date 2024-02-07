import React from "react";
import {Card, Ratio} from "react-bootstrap";
import "./BlogCard.css";

const BlogCard = (props) => {
    const blog = props.blog;

    return (
        <a className="col-10 col-md-6 col-lg-3 m-1 text-center text-decoration-none" href={`/blog/${blog.id}/${blog.slug}`}>
            <Card className="shadow">
                <Ratio aspectRatio="16x9">
                    <Card.Img src={"/media/" + blog.image} alt={blog.title} />
                </Ratio>
                <Card.Body className="bg-primary bg-opacity-75 w-100 position-absolute bottom-0 p-1 text-light">
                    <h6 className="m-1 fw-bold" dir="auto">{blog.title}</h6>
                    <p className="m-1">{blog.description}</p>
                </Card.Body>
            </Card>
        </a>
    );
};

export default BlogCard;
