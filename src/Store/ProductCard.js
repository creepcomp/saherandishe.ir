import React from "react";
import {Card, Ratio, Carousel, Table, Dropdown} from "react-bootstrap";
import "./ProductCard.css";

const ProductCard = (props) => {
    const product = props.product;

    return (
        <a className="col-10 col-md-6 col-lg-3 col-xl-2 m-1 text-decoration-none text-center" href={`/store/product/${product.id}/${product.slug}`}>
            <Card className="shadow">
                <Ratio aspectRatio="1x1">
                    {product.images ? (
                        <Carousel indicators={false}>
                            {product.images.map((x, i) => (
                                <Carousel.Item key={i}>
                                    <Card.Img src={"/media/" + x} rel={product.name} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ): <Card.Img rel={product.name} />}
                </Ratio>
                <Card.Body className="bg-primary bg-opacity-75 w-100 position-absolute bottom-0 p-1 text-light">
                    <h6 className="m-1 fw-bold" dir="auto">{product.name}</h6>
                    {product.discount ? (
                        <>
                            <small className="d-block">
                                <s>{Number(product.price).toLocaleString("fa")} تومان</s>
                            </small>
                            <strong className="d-block">{Number(product.price - product.discount).toLocaleString("fa")} تومان</strong>
                        </>
                    ) : (
                        <strong className="d-block m-1">{Number(product.price).toLocaleString("fa")} تومان</strong>
                    )}
                </Card.Body>
                <Dropdown.Menu className="position-absolute start-100 d-none" style={{width: "500px"}} show>
                    <h5 className="text-center" dir="auto">{product.name}</h5>
                    <Table striped>
                        <tbody>
                            {Object.keys(product.specification).map((x, i) => (
                                <tr key={i}>
                                    <td dir="auto">{x}</td>
                                    <td dir="auto">{product.specification[x]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <p className='text-justify m-1'>{product.description}</p>
                </Dropdown.Menu>
            </Card>
        </a>
    );
};

export default ProductCard;
