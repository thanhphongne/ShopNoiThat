import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }

        dispatch(getOrderDetails(match.params.id));
    }, [dispatch, alert, error, match.params.id]);
    return (
        <Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
            <MetaData title="Thông tin đơn hàng" />
            <div className="orderDetailsPage">
                <div className="orderDetailsContainer">
                <Typography component="h1">
                    Đơn hàng #{order && order._id}
                </Typography>
                <Typography>Thông tin nhận hàng</Typography>
                <div className="orderDetailsContainerBox">
                    <div>
                    <p>Khách hàng:</p>
                    { order.user ?
                        <span>{order.user && order.user.name}</span> : null
                    }
                    </div>
                    <div>
                    <p>Số điện thoại:</p>
                    {order.shippingInfo ? <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span> :null}
                    </div>
                    <div>
                    <p>Địa chỉ:</p>
                    <span>
                        {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                    </span>
                    </div>
                </div>
                <Typography>Thanh toán</Typography>
                <div className="orderDetailsContainerBox">
                    <div>
                    <p
                        className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                    >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </p>
                    </div>

                    <div>
                    <p>Số tiền:</p>
                    <span>{order.totalPrice && order.totalPrice.toLocaleString()} VND</span>
                    </div>
                </div>

                <Typography>Trạng thái</Typography>
                <div className="orderDetailsContainerBox">
                    <div>
                    <p
                        className={
                        order.orderStatus && order.orderStatus === "Đã nhận hàng"
                            ? "greenColor"
                            : "redColor"
                        }
                    >
                        {order.orderStatus && order.orderStatus}
                    </p>
                    </div>
                </div>
                </div>

                <div className="orderDetailsCartItems">
                <Typography>Sản phẩm:</Typography>
                <div className="orderDetailsCartItemsContainer">
                    {order.orderItems &&
                    order.orderItems.map((item) => (
                        <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                            {item.name}
                        </Link>{" "}
                        <span>
                            {item.quantity} X {item.price.toLocaleString()} VND ={" "}
                            <b>{(item.price*item.quantity).toLocaleString()} VND</b>
                        </span>
                        </div>
                    ))}
                </div>
                </div>
            </div>
            </Fragment>
        )}
        </Fragment>
    );
};

export default OrderDetails;