import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import OrderStep from "./OrderStep";
import { cancelOrder } from "../../actions/orderAction";
import { CANCEL_ORDER_RESET } from "../../constants/orderConstants";

const OrderDetails = ({ match ,  history }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: cancelError, isCanceled } = useSelector((state) => state.order);

    const dispatch = useDispatch();
    const alert = useAlert();
    const cancelOrderHandler = (id) => {
        dispatch(cancelOrder(id));
    };
        console.log(match.params.id)
    const numStep = (status) => {
        switch (status) {
            case "Chờ xác nhận":
                return 0;
            case "Chờ lấy hàng":
                return 1;
            case "Đang giao hàng":
                return 2;
            case "Đã nhận hàng":
                return 3;
            case "Đã hủy":
                return 4;
            default:
                break;
        }
    }

    useEffect(() => {
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }
        if (cancelError) {
        alert.error(cancelError);
        dispatch(clearErrors());
        }
    
        if (isCanceled) {
        alert.success("Đã hủy đơn hàng");
        history.push("/orders");
        dispatch({ type: CANCEL_ORDER_RESET });
        }

        dispatch(getOrderDetails(match.params.id));
    }, [dispatch, alert, error, match.params.id, cancelError, isCanceled, history]);
    return (
        <Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
            <MetaData title="Thông tin đơn hàng" />
            <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
            <OrderStep activeStep={numStep(order.orderStatus)}/>
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
                {
                    order.orderStatus === "Chờ xác nhận" && (
                        <div className="detroyOrder">
                            <button onClick={() => cancelOrderHandler(match.params.id)}>Hủy đơn hàng</button>
                        </div>
                    )
                }
            </div>
            </Fragment>
        )}
        </Fragment>
    );
};

export default OrderDetails;