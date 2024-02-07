import React from "react";
import {useCookies} from "react-cookie";
import {Row, Col, Container, Image, Carousel, Ratio, Table, Button, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import Markdown from "react-markdown";

const ProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = React.useState({});

    React.useEffect(() => {
        fetch(`/api/store/products/${id}/`).then(async (r) => {
            const data = await r.json();
            if (r.ok) {
                fetch(`/api/store/categories/${data.category}/`).then((r) => r.json()).then((x) => setProducts({...products, category: x}));
                fetch(`/api/store/brands/${data.brand}/`).then((r) => r.json()).then((x) => setProducts({...products, brand: x}));
                setProduct(data);
            } else console.error(data);
        });
    }, []);

    return (
        <Container className="my-2">
            <Helmet>
                <title>{`${product.name}${product.category ? ` | ${product.category.name}`: null}${product.brand ? ` | ${product.brand.name}`: null}} | فروشگاه ساحراندیشه`}</title>
                <meta name="keywords" content={product.keywords} />
                <meta name="description" content={product.description} />
            </Helmet>
            <Row>
                <Col lg>
                    <Ratio aspectRatio="1x1" className="bg-light rounded mb-2">
                        {product.images ? (
                            <Carousel>
                                {product.images.map((x, i) => (
                                    <Carousel.Item key={i}>
                                        <Image className="rounded" src={"/media/" + x} rel={product.name} fluid />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ) : (
                            <div className="w-100 h-100 d-flex justify-content-center align-items-center">بدون عکس</div>
                        )}
                    </Ratio>
                </Col>
                <Col>
                    <div className="bg-light rounded p-2">
                        <h1 className="h2 border-bottom text-center p-2">{product.name}</h1>
                        <Table className="align-middle">
                            <thead>
                                <tr>
                                    <td colSpan={2}>
                                        <span className="h5 d-block text-center m-1">اطلاعات</span>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {product.category ? (
                                    <tr>
                                        <td>دسته بندی:</td>
                                        <td>
                                            <a href={`/store/category/${product.category.slug}`}>{product.category.name}</a>
                                        </td>
                                    </tr>
                                ) : null}
                                {product.brand ? (
                                    <tr>
                                        <td>برند:</td>
                                        <td>
                                            <a href={`/store/brand/${product.brand.slug}`}>{product.brand.name}</a>
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </Table>
                        {product.specification ? (
                            <>
                                <Table className="align-middle">
                                    <thead>
                                        <tr>
                                            <td colSpan={2}>
                                                <span className="h5 d-block text-center m-1">مشخصات</span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(product.specification).map((x, i) => (
                                            <tr key={i}>
                                                <td>{x}</td>
                                                <td>{product.specification[x]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        ) : null}
                        <div className="text-center">
                            {product.discount ? (
                                <div>
                                    <small className="d-block">
                                        <s>{Number(product.price).toLocaleString("fa")} تومان</s>
                                    </small>
                                    <strong className="d-block">{Number(product.price - product.discount).toLocaleString("fa")} تومان</strong>
                                </div>
                            ) : (
                                <strong className="d-block m-1">{Number(product.price).toLocaleString("fa")} تومان</strong>
                            )}
                        </div>
                        <AddToCard />
                        {product.keywords ? (
                            <div className="d-flex flex-wrap justify-content-evenly align-items-center border-top">
                                {product.keywords.split(", ").map((x, i) => <strong key={i} className="m-1">#{x}</strong>)}
                            </div>
                        ) : null}
                    </div>
                </Col>
            </Row>
            {product.body ? (
                <div className="bg-light rounded-5 m-1 p-1">
                    <h4 className="border-bottom p-2 text-center">توضیحات</h4>
                    <Markdown className="m-1">{product.body}</Markdown>
                </div>
            ) : null}
        </Container>
    );
};

const AddToCard = (props) => {
    const pID = props.product;
    const [cookies] = useCookies();
    const [quantity, setQuantity] = React.useState(1);

    const buy = () => {
        fetch("/api/store/items/addToCard/", {
            method: "POST",
            headers: {"X-CSRFToken": cookies.csrftoken},
            body: JSON.stringify({"product": pID, "quantity": quantity}),
        });
    };

    return (
        <Row className="text-center m-2">
            <Col>
                <div className="d-flex justify-content-center align-items-center">
                    <Button className={quantity <= 1 ? "disabled" : null} onClick={(e) => setQuantity(quantity - 1)}>
                        <i className="fa-solid fa-minus" />
                    </Button>
                    <Form.Control style={{width: "5ch"}} value={quantity} />
                    <Button onClick={(e) => setQuantity(quantity + 1)}>
                        <i className="fa-solid fa-plus" />
                    </Button>
                </div>
            </Col>
            <Col>
                <Button variant="success" onClick={buy}>
                    افزودن به سبد خرید
                </Button>
            </Col>
        </Row>
    );
};

export default ProductPage;
