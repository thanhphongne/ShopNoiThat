import React, { Fragment } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import ProductCard from './ProductCard.js';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import Search from '../Product/Search'

const Home = ({history}) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
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
                    <h1>Những Sản Phẩm Tuyệt Vời Ở Bên Dưới</h1>
                    
                    <a href="#container">
                    <button>
                    Click Me <CgMouse />
                    </button>
                    </a>
                    </div>

                    <h2 className="homeHeading">Sản Phẩm Nổi Bật</h2>

                    <div className="container" id="container">
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
