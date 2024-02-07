import React, {Suspense} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./style.css";
const Home = React.lazy(() => import("./Home"));
const Store = React.lazy(() => import("./Store"));
const Blog = React.lazy(() => import("./Blog"));
const Admin = React.lazy(() => import("./Admin"));

const App = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route
                            index
                            element={
                                <Suspense fallback={<div>در حال بارگذاری ..</div>}>
                                    <Home />
                                </Suspense>
                            }
                        />
                        <Route
                            path="store/*"
                            element={
                                <Suspense fallback={<div>در حال بارگذاری ..</div>}>
                                    <Store />
                                </Suspense>
                            }
                        />
                        <Route
                            path="blog/*"
                            element={
                                <Suspense fallback={<div>در حال بارگذاری ..</div>}>
                                    <Blog />
                                </Suspense>
                            }
                        />
                        <Route
                            path="admin/*"
                            element={
                                <Suspense fallback={<div>در حال بارگذاری ..</div>}>
                                    <Admin />
                                </Suspense>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
};

const domNode = document.getElementById("app");
const root = createRoot(domNode);
root.render(<App />);
