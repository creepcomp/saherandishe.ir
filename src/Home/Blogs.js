import React from "react";
import BlogCard from "../Blog/BlogCard";
import {Container} from "react-bootstrap";

const Blogs = () => {
    const [blogs, setBlogs] = React.useState();

    React.useEffect(() => {
        fetch("/api/blog/blogs/").then(async (r) => {
            const data = await r.json();
            if (r.ok) setBlogs(data);
            else console.error(data);
        });
    }, []);

    return (
        <Container className="bg-secondary text-light rounded p-2">
            <h2 className="text-center border-bottom p-2">مطالب</h2>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {blogs && blogs.length > 0 ? blogs.map((x, i) => (
                    <BlogCard key={i} blog={x} />
                )) : "کالایی جهت نمایش وجود ندارد."}
            </div>
        </Container>
    );
};

export default Blogs;
