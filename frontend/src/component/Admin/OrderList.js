import React, { Fragment, useEffect, useState } from "react";
import "./ProductList.css";
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
                                            </div>
                                        ))}
                                    </div>
                                    <span>{order.totalPrice && (order.totalPrice).toLocaleString()} VND</span>
                                    <Link to={`/admin/order/${order._id}`}>
                                    <EditIcon/></Link>
                                    <Button onClick={() => deleteOrderHandler(order._id)}><DeleteIcon/></Button>
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