import React, { Fragment, useEffect, useState } from "react";
import "./OrderList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
    deleteOrder,
    getAllOrders,
    clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };
    const [status, setStatus] = useState('Chờ xác nhận')
    const [orderId, setOrderId] = useState('')
    const searchOrder = (e) => {
        if(e.length === 24){
            setOrderId(e)

        }
    }

    useEffect(() => {
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }

        if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
        }

        if (isDeleted) {
        alert.success("Đã xóa đơn hàng");
        history.push("/admin/orders");
        dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    

    return (
        <Fragment>
        <MetaData title={`Tất cả đơn hàng - Quản trị`} />

        <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
            <h1 id="productListHeading">Tất cả đơn hàng</h1>
            <form className="searchOrder">
                <input type="text" value={orderId} placeholder='Nhập mã đơn hàng' onChange={(e) => {searchOrder(e.target.value)}}/>
                <button onClick={()=> {setOrderId(null)}}>Xóa</button>
                </form>
            {
                orderId && (
                <div className="searchOrderResult">
                    
                    {orders.filter(order => order._id===orderId).map(order => (
                        <div className="order">
                        <div id='orderId'>Mã đơn hàng: {order._id}</div>
                        <div className={
                            order.orderStatus && order.orderStatus === "Đã nhận hàng"
                                ? "greenColor"
                                : "redColor"
                            }>Trạng thái: {order.orderStatus}</div>
                        <div className="orderProducts">
                        {order.orderItems &&
                            order.orderItems.map((item) => (
                                <div key={item.product} className='product'>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>{" "}
                                    <span>
                                        {item.quantity} X {item.price.toLocaleString()} VND 
                                    </span>
                                </div>
                            ))}
                        </div>
                        <span className="red">Tổng cộng: {order.totalPrice && (order.totalPrice).toLocaleString()} VND</span>
                        <div className="action">
                            <Button onClick={() => deleteOrderHandler(order._id)}><DeleteIcon/></Button>
                            <Link to={`/admin/order/${order._id}`}>
                            <EditIcon/></Link>
                                </div>
                                </div>
                    ))
                }
                </div>
                )
            }
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
                                <div id='orderId'>Mã đơn hàng: {order._id}</div>
                                <div className={
                                    order.orderStatus && order.orderStatus === "Đã nhận hàng"
                                        ? "greenColor"
                                        : "redColor"
                                    }>Trạng thái: {order.orderStatus}</div>
                                <div className="orderProducts">
                                {order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.product} className='product'>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} X {item.price.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <span className="totalPrice">Tổng cộng: {order.totalPrice && (order.totalPrice).toLocaleString()} VND</span>
                                <div className="action">
                                    <Button onClick={() => deleteOrderHandler(order._id)}><DeleteIcon/></Button>
                                    <Link to={`/admin/order/${order._id}`}>
                                    <EditIcon/></Link>
                                </div>
                                </div>
                            ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
        </Fragment>
    );
};

export default OrderList;