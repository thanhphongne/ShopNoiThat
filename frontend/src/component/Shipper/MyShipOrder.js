import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getMyShipOrders,updateShipOrder } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import './MyShipOrders.css'
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";


const MyShipOrder = () => {
    const dispatch = useDispatch();

    const alert = useAlert();
    const { user } = useSelector((state) => state.user);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const [status, setStatus] = useState('Chờ lấy hàng');

    
    const acceptHandler = (id) => {
        const myForm = new FormData();
        myForm.set("status", 'Đang giao hàng');
        dispatch(updateShipOrder(id, myForm))
    }
    const denyHandler = (id) => {
        const myForm = new FormData();
        myForm.set("status", 'Chờ xác nhận');
        dispatch(updateShipOrder(id, myForm))
    }
    
    

    const { loading, error, orders } = useSelector((state) => state.allOrders);


    useEffect(() => {
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }
        if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
        }
        if (isUpdated) {
        alert.success("Xử lý thành công");
        dispatch({ type: UPDATE_ORDER_RESET });
        }
        dispatch(getMyShipOrders());
    }, [dispatch, alert, error, updateError, isUpdated]);

    return (
        <Fragment>
            <MetaData title={`Shipper - ${user.name}`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="myShipOrdersPage">
                <Typography id="myShipOrdersHeading">Shipper {user.name}</Typography>
                <div className="orderList">
                    <div className="orderHeading">
                        <div onClick={()=> setStatus('Chờ lấy hàng')}>Chờ lấy hàng({orders && orders.filter( order => order.orderStatus === 'Chờ lấy hàng').length})</div>
                        <div onClick={()=> setStatus('Đang giao hàng')}>Đang giao hàng({orders && orders.filter( order => order.orderStatus === 'Đang giao hàng').length})</div>
                        <div onClick={()=> setStatus('Đã nhận hàng')}>Đã nhận hàng({orders && orders.filter( order => order.orderStatus === 'Đã nhận hàng').length})</div>
                    </div>
                    {orders && (
                        <div className="ShipOrders">
                            { orders.filter( order => order.orderStatus === status).map(order => (
                                <Link to={`/shipper/order/${order._id}`}>
                                <div className="SingleOrder">
                                    <div className="ShipOrder">
                                        <div>{order._id}</div>
                                        <span>Địa chỉ: {order.shippingInfo.address}, {order.shippingInfo.state}, {order.shippingInfo.country}</span>
                                        <div className="ShipOrderProducts">
                                            {order.orderItems &&
                                                order.orderItems.map((item) => (
                                                    <div key={item.product} className='ShipProduct'>
                                                        <img src={item.image} alt="ShipProduct" />
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>{" "}
                                                        <span>
                                                    {item.quantity} X {item.price.toLocaleString()} VND 
                                                </span>
                                                    </div>
                                                ))}
                                        </div>
                                        <span className="price">{order.totalPrice && (order.totalPrice).toLocaleString()} VND</span>
                                    </div>
                                    {order.orderStatus === 'Chờ lấy hàng' && 
                                    <div className="Button">
                                            <button onClick={() => denyHandler(order._id)}>Từ chối</button>
                                            <button onClick={() => acceptHandler(order._id)}>Chấp nhận</button>
                                    </div>
                                    }
                                </div>
                                </Link>
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

export default MyShipOrder;