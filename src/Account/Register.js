import React from "react";
import {Alert, Button, Form, Modal, Row, Col} from "react-bootstrap";
import {useCookies} from "react-cookie";

const Register = () => {
    const [cookies] = useCookies();
    const [show, setShow] = React.useState(false);
    const [input, setInput] = React.useState({});
    const [error, setError] = React.useState("");
    const [sended, setSended] = React.useState(false);

    const register = () => {
        fetch("/api/account/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies.csrftoken,
            },
            body: JSON.stringify(input),
        }).then(async (r) => {
            const data = await r.json();
            if (r.ok) document.location = "/";
            else setError(data.message);
        });
    };

    const SendCode = () => {
        fetch("/api/account/sendcode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies.csrftoken,
            },
            body: JSON.stringify({username: input.username}),
        }).then(async (r) => {
            if (r.ok()) setSended(true);
            else {
                const data = await r.json();
                setError(data.message);
            }
        });
    };

    const handleChange = (e) => setInput({...input, [e.target.name]: e.target.value});

    return (
        <>
            <Button className="m-1" onClick={() => setShow(true)}>
                ثبت نام
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>ثبت نام حساب کاربری</Modal.Header>
                <Modal.Body>
                    {error ? <Alert variant="danger">{error}</Alert> : null}
                    <Row>
                        <Col>
                            <Form.Label>شماره همراه:</Form.Label>
                            <Form.Control name="username" placeholder="0912XXXXXXX" value={input.username} onChange={handleChange} />
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center" sm={4}>
                            {sended ? <Form.Control name="code" placeholder="کد دریافتی" value={input.code} onChange={handleChange} /> : <Button onClick={SendCode}>دریافت کد</Button>}
                        </Col>
                    </Row>
                    <Form.Label>رمز عبور:</Form.Label>
                    <Form.Control name="password" placeholder="●●●●●●●●" type="password" value={input.password} onChange={handleChange} />
                    <Button onClick={register} className="d-block w-100 mt-2">
                        ثبت نام
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Register;
