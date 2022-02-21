import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import {addItemsToCart} from '../../actions/cartAction'

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails,
    );

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id, error, alert]);

    const options = {
        edit: false,
        color: 'rgba(20,20,20,0.1)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    };

    const [quantity, setQuantity] = useState(1)

    const decreaseQuantity = () => {
        if(quantity <= 1) return

        const qty = quantity - 1
        setQuantity(qty)
    }

    const increaseQuantity = () => {
        if(product.Stock <= quantity) return

        const qty = quantity + 1
        setQuantity(qty)
    }

    const addToCartHander = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Đã thêm sản phẩm vào giỏ hàng")
    }
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} -- Nội Thất Cần Thơ`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Mã # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
                                <span>({product.numOfReviews} Đánh giá)</span>
                            </div>
                            <div className="detailsBlock-3">
                                {product.price ? (
                                    <span>{`${product.price.toLocaleString()} VND`}</span>
                                ) : null}
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type="number" />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{' '}
                                    <button onClick={addToCartHander}>Thêm vào giỏ hàng</button>
                                </div>

                                <p>
                                    Trạng thái:{' '}
                                    <b
                                        className={
                                            product.Stock < 1
                                                ? 'redCokor'
                                                : 'greenColor'
                                        }
                                    >
                                        {product.Stock < 1
                                            ? 'Hết hàng'
                                            : 'Còn hàng'}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                <p>Mô tả: {product.description}</p>
                                <p>Thương hiệu: {product.supplier}</p>
                            </div>

                            <button className="submitReview">Đánh giá</button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">Tất cả đánh giá</h3>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">Chưa có đánh giá nào</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
