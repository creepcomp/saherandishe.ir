import React from "react";
import {Button, Dropdown} from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

const Authorization = () => {
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        fetch("/api/account/me/").then(async (r) => {
            const data = await r.json();
            if (r.ok) setUser(data);
            else console.error(data);
        });
    }, []);

    return <>
        {user ? (
            <>
                {user.is_staff ? (
                    <Button variant="danger" className="m-1" href="/admin">
                        <i className="fa-solid fa-user-tie" />
                    </Button>
                ) : null}
                <Dropdown>
                    <Dropdown.Toggle variant="light" className="m-1">
                        <i className="fa-solid fa-user" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="text-center" style={{right: "-250%"}}>
                        <Button className="m-1">حساب کاربری</Button>
                        <Button variant="danger" className="m-1" onClick={() => {
                            fetch("/api/account/logout/").then(() => window.location.reload());
                        }}>
                            <i className="fa-solid fa-door-open" /> خروج
                        </Button>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        ): (
            <>
                <Login />
                <Register />
            </>
        )}
    </>;
};

export default Authorization;
