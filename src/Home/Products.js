import React from "react";
import ProductCard from "../Store/ProductCard";

const Products = () => {
    const [products, setProducts] = React.useState([]);

    React.useState(() => {
        fetch("/api/store/products/").then(async (r) => {
            const data = await r.json();
            if (r.ok) setProducts(data);
            else console.error(data);
        });
    }, []);

    return (
        <div className="bg-primary text-light rounded p-2">
            <h2 className="text-center border-bottom p-2">فروشگاه</h2>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {products && products.length > 0 ? products.map((x, i) => (
                    <ProductCard key={i} product={x} />
                )): "کالایی جهت نمایش وجود ندارد."}
            </div>
        </div>
    );
};

export default Products;
