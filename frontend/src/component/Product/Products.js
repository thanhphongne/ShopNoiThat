import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';



const Products = ({ match }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 100]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);
    const {
        products,
        Allproducts,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    let categories = ['Tất cả'];
    Allproducts && Allproducts.forEach(product => {
        if (!categories.includes(product.category)) {
            categories.push(product.category)
        }
    }
    )
    console.log(categories);

    const keyword = match.params.keyword;
    
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [
        dispatch,
        keyword,
        currentPage,
        price,
        category,
        ratings,
        alert,
        error,
    ]);

    let count = filteredProductsCount;

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Tất cả sản phẩm -- Nội Thất Cần Thơ" />
                    <h2 className="productsHeading">Tất cả sản phẩm</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Giá (triệu)</Typography>
                        <Slider
                            value={price}
                            onChangeCommitted={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            step={10}
                            marks
                            min={0}
                            max={100}
                        />

                        <Typography>Danh Mục</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <Typography component="legend">Đánh giá</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating) => {
                                setRatings(newRating);
                            }}
                            aria-labelledby="continuose-slider"
                            min={0}
                            max={5}
                            valueLabelDisplay="auto"
                        />
                    </div>

                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText=">>"
                                prevPageText="<<"
                                firstPageText="Trang đầu"
                                lastPageText="Trang cuối"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
