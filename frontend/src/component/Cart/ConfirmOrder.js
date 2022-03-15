import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { createOrder } from "../../actions/orderAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";


const ConfirmOrder = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 10000000 ? 0 : 50000;

    const totalPrice = subtotal + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.state},  ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
        subtotal,
        shippingCharges,
        totalPrice,
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        history.push("/process/payment");
    };
    const proceedToCreateOrder = () => {
        const order = {
            shippingInfo,
            orderItems: cartItems,
            itemsPrice: subtotal,
            shippingPrice: shippingCharges,
            totalPrice: totalPrice,
        };
        order.paymentInfo = {
            id: 'NotPaid',
            status: "Thanh toán khi nhận hàng",
        };

        dispatch(createOrder(order));
        alert.success("Mua hàng thành công");

        history.push("/success");
    }

    return (
        <Fragment>
        <MetaData title="Xác nhận đơn hàng" />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
            <div>
            <div className="confirmshippingArea">
                <Typography>Thông tin nhận hàng</Typography>
                <div className="confirmshippingAreaBox">
                <div>
                    <p>Tên:</p>
                    <span>{user.name}</span>
                </div>
                <div>
                    <p>Số điện thoại:</p>
                    <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                    <p>Địa chỉ:</p>
                    <span>{address}</span>
                </div>
                </div>
            </div>
            <div className="confirmCartItems">
                <Typography>Sản phẩm:</Typography>
                <div className="confirmCartItemsContainer">
                {cartItems &&
                    cartItems.map((item) => (
                    <div key={item.product}>
                        <img src={item.image} alt={item.name} />
                        <Link to={`/product/${item.product}`}>
                            {item.name}
                        </Link>{" "}
                        <span>
                        {item.quantity} X {item.price.toLocaleString()} ={" "}
                        <b>{(item.price * item.quantity).toLocaleString()} VND</b>
                        </span>
                    </div>
                    ))}
                </div>
            </div>
            </div>
            {/*  */}
            <div>
            <div className="orderSummary">
                <Typography>Tổng thanh toán</Typography>
                <div>
                    <div>
                        <p>Tổng tiền hàng:</p>
                        <span>{subtotal.toLocaleString()} VND</span>
                    </div>
                    <div>
                        <p>Phí vận chuyển:</p>
                        <span>{shippingCharges.toLocaleString()} VND</span>
                    </div>
                </div>

                <div className="orderSummaryTotal">
                <p>
                    <b>Thành tiền:</b>
                </p>
                <span>{totalPrice.toLocaleString()} VND</span>
                </div>

                <button onClick={proceedToPayment}>Thanh toán ngay</button>
                <button onClick={proceedToCreateOrder} style={{"margin-top": "10px"}}>Thanh toán khi nhận hàng</button>
            </div>
            </div>
        </div>
        </Fragment>
    );
};

export default ConfirmOrder;