import React, { Fragment } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import ProductCard from './ProductCard.js';
import BlogCard from './BlogCard.js';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import {  getAllBlogs } from '../../actions/blogAction';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const Home = ({history}) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    const {blogs } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
        dispatch(getAllBlogs());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Nội Thất Cần Thơ" />
                    <div className="banner">
                    <p>Chào Mừng Bạn Đến Với Nội Thất Cần Thơ</p>
                    <h1><b>Những Sản Phẩm Tuyệt Vời Ở Bên Dưới</b></h1>
                    
                    <a href="#container">
                    <button>
                    Click Me <CgMouse />
                    </button>
                    </a>
                    </div>

                    <h2 className="homeHeading">Bài Viết Nổi Bật</h2>
                    <div className="blogs" id="container">
                        {blogs &&
                            blogs.slice(0,3).map((blog, index) => (
                                <BlogCard blog={blog} index={index}/>
                            ))}
                    </div>
                    <h2 className="homeHeading">Sản Phẩm Nổi Bật</h2>

                    <div className="container" >
                        {products &&
                            products.map((product) => (
                                <ProductCard product={product} />
                            ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
