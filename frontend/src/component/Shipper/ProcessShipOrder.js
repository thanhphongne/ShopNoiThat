import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import {
    getOrderDetails,
    clearErrors,
    updateShipOrder,
} from '../../actions/orderAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { Button } from '@material-ui/core';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import './ProcessShipOrder.css';
import { getAllUsers } from '../../actions/userAction.js';

const ProcessOrder = ({ history, match }) => {
    const { order, error, loading } = useSelector(
        (state) => state.orderDetails,
    );
    const { error: updateError, isUpdated } = useSelector(
        (state) => state.order,
    );

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('status', status);

        dispatch(updateShipOrder(match.params.id, myForm));
    };

    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState('');

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
            alert.success('Xử lý thành công');
            dispatch({ type: UPDATE_ORDER_RESET });
        }
        dispatch(getAllUsers());

        dispatch(getOrderDetails(match.params.id));
    }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

    return (
        <Fragment>
            <MetaData title="Xử lý đơn hàng" />
                <div className="newShippingContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display:
                                    order.orderStatus === 'Đã nhận hàng'
                                        ? 'block'
                                        : 'grid',
                            }}
                        >
                            <div className='shippingContainner'>
                                <div className="ShippingArea">
                                    <Typography>Thông tin nhận hàng</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Khách hàng:</p>
                                            <span>
                                                {order.user && order.user.name}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Số điện thoại:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Địa chỉ:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.state},  ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Thanh toán</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.paymentInfo &&
                                                    order.paymentInfo.status ===
                                                        'succeeded'
                                                        ? 'greenColor'
                                                        : 'redColor'
                                                }
                                            >
                                                {order.paymentInfo &&
                                                order.paymentInfo.status ===
                                                    'succeeded'
                                                    ? 'Đã thanh toán'
                                                    : 'Chưa thanh toán'}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Thành tiền:</p>
                                            <span>
                                                {order.totalPrice &&
                                                    order.totalPrice.toLocaleString()}{' '}
                                                VND
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Trạng thái</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus &&
                                                    order.orderStatus ===
                                                        'Đã nhận hàng'
                                                        ? 'greenColor'
                                                        : 'redColor'
                                                }
                                            >
                                                {order.orderStatus &&
                                                    order.orderStatus}{' '}
                                                lúc:{' '}
                                                {order.deliveredAt &&
                                                    order.deliveredAt.substring(
                                                        11,
                                                        16,
                                                    )}{' '}
                                                ngày{' '}
                                                {order.deliveredAt &&
                                                    order.deliveredAt.substring(
                                                        0,
                                                        10,
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Sản phẩm:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <img
                                                        src={item.image}
                                                        alt="Product"
                                                    />
                                                    <div className='Details'>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>{' '}
                                                    <span>
                                                        {item.quantity} X{' '}
                                                        {item.price.toLocaleString()}{' '}
                                                        ={' '}
                                                        <b>
                                                            {(
                                                                item.price *
                                                                item.quantity
                                                            ).toLocaleString()}{' '}
                                                            VND
                                                        </b>
                                                    </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display:
                                        order.orderStatus === 'Đã nhận hàng'
                                            ? 'none'
                                            : 'block',
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    
                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        onClick={()=> {setStatus('Đã nhận hàng')}}
                                        
                                    >
                                        Đã giao xong
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
        </Fragment>
    );
};

export default ProcessOrder;
