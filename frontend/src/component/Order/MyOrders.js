import React, { Fragment, useEffect, useState } from "react";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const [status, setStatus] = useState('Chờ xác nhận');
    useEffect(() => {
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            <MetaData title={`Đơn hàng - ${user.name}`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                <Typography id="myOrdersHeading">Khách hàng {user.name}</Typography>
                <div className="orderList">
                    <div className="orderHeading">
                        <div onClick={()=> setStatus('Chờ xác nhận')}>Chờ xác nhận({orders && orders.filter( order => order.orderStatus === 'Chờ xác nhận').length})</div>
                        <div onClick={()=> setStatus('Chờ lấy hàng')}>Chờ lấy hàng({orders && orders.filter( order => order.orderStatus === 'Chờ lấy hàng').length})</div>
                        <div onClick={()=> setStatus('Đang giao hàng')}>Đang giao hàng({orders && orders.filter( order => order.orderStatus === 'Đang giao hàng').length})</div>
                        <div onClick={()=> setStatus('Đã nhận hàng')}>Đã nhận hàng({orders && orders.filter( order => order.orderStatus === 'Đã nhận hàng').length})</div>
                        <div onClick={()=> setStatus('Đã hủy')}>Đã hủy({orders && orders.filter( order => order.orderStatus === 'Đã hủy').length})</div>
                    </div>
                    {orders && (
                        <div className="orders">
                            { orders.filter( order => order.orderStatus === status).map(order => (
                                <div className="order">
                                    <div>{order._id}</div>
                                    <div className="orderProducts">
                                    {order.orderItems &&
                                        order.orderItems.map((item) => (
                                            <div key={item.product} className='product'>
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
                                    <span>{order.totalPrice && (order.totalPrice).toLocaleString()} VND</span>
                                    <Link to={`/order/${order._id}`}>
                                    <LaunchIcon/></Link>
                                </div>
                            ))
                            }
                        </div>
                    )}
                </div>
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;