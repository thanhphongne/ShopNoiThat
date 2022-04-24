import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import {addItemsToCart} from '../../actions/cartAction'
import { Rating } from "@material-ui/lab";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@material-ui/core'

import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails,
    );
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id, error, alert]);

    const options = {
        size: 'large',
        value: product.ratings,
        readOnly: true,
        precision:0.5,
    };

    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

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
    const handleInputQuantity = (value) => {
        if(value >= 0 && value <= product.Stock) {
            setQuantity(value)
        }
    }

    const addToCartHander = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Đã thêm sản phẩm vào giỏ hàng")
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }
    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
    };
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if(success) {
            alert.success('Đã đăng bình luận sản phẩm');
            dispatch({type: NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, error, alert, match.params.id, reviewError, success])
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} -- Nội Thất Cần Thơ`} />
                    <div className="ProductDetails">
                        <div>
                            <TransformWrapper>
                                <TransformComponent><Carousel>
                                    {product.images &&
                                        product.images.map((item, i) => (
                                            <img
                                                className="CarouselImage"
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                            />
                                        ))}</Carousel>
                                </TransformComponent>
                            </TransformWrapper>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Mã # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">({product.numOfReviews} Đánh giá)</span>
                            </div>
                            <div className="detailsBlock-3">
                                {product.price ? (
                                    <span>{`${product.price.toLocaleString()} VND`}</span>
                                ) : null}
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input value={quantity} type="number" onChange={(e) => handleInputQuantity(e.target.value)}/>
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{' '}
                                    <button 
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHander}
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
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

                            <button onClick={submitReviewToggle} className="submitReview">Đánh giá</button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">Tất cả đánh giá</h3>
                    
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Đăng bình luận</DialogTitle>
                        <DialogContent className="submitDialog">
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />

                        <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                            Hủy
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Đăng
                        </Button>
                        </DialogActions>
                    </Dialog>

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
