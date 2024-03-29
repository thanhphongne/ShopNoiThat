import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './Success.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    localStorage.removeItem('cartItems');
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Mua hàng thành công</Typography>
            <Link to="/orders">Xem đơn hàng</Link>
        </div>
    );
};

export default OrderSuccess;
