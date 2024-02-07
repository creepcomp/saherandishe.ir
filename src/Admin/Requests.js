import React from "react";
import {Table} from "react-bootstrap";

const Requests = () => {
    const [requests, setRequests] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/admin/requests/").then(async (r) => {
            const data = await r.json();
            if (r.ok) setRequests(data);
            else console.error(data);
        });
    }, []);

    return (
        <div className="overflow-auto m-1" style={{height: "1000px"}} dir="ltr">
            <Table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>HTTP_X_FORWARDED_FOR</td>
                        <td>HTTP_USER_AGENT</td>
                        <td>METHOD</td>
                        <td>PATH</td>
                        <td>STATUS_CODE</td>
                        <td>AT</td>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((x, i) => (
                        <tr key={i}>
                            <td>{x.id}</td>
                            <td>{x.http_x_forwarded_for}</td>
                            <td>{x.http_user_agent}</td>
                            <td>{x.method}</td>
                            <td>{x.path}</td>
                            <td>{x.status_code}</td>
                            <td>{x.at}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Requests;
