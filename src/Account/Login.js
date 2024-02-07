import React from "react";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {useCookies} from "react-cookie";

const Login = () => {
    const [cookies] = useCookies();
    const [show, setShow] = React.useState(false);
    const [input, setInput] = React.useState({});
    const [error, setError] = React.useState("");

    const login = () => {
        fetch("/api/account/login/", {
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

    const handleChange = (e) => setInput({...input, [e.target.name]: e.target.value});

    return (
        <>
            <Button className="m-1" onClick={() => setShow(true)}>
                ورود
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>ورود به حساب کاربری</Modal.Header>
                <Modal.Body>
                    {error ? <Alert variant="danger">{error}</Alert> : null}
                    <Form.Label>شماره همراه:</Form.Label>
                    <Form.Control name="username" placeholder="0912XXXXXXX" value={input.username} onChange={handleChange} />
                    <Form.Label>رمز عبور:</Form.Label>
                    <Form.Control name="password" placeholder="●●●●●●●●" type="password" value={input.password} onChange={handleChange} />
                    <Button onClick={login} className="d-block w-100 mt-2">
                        ورود
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Login;
