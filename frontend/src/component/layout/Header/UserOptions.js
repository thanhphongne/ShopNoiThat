import React, { Fragment, useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import DashbroardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart)
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: 'Đơn hàng', func: orders },
        { icon: <PersonIcon />, name: 'Tôi', func: account },
        { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}/>, name: `Giỏ hàng(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: 'Đăng  xuất', func: logoutUser },
    ];

    if (user.role === 'admin') {
        options.unshift({
            icon: <DashbroardIcon />,
            name: 'Quản trị',
            func: dashboard,
        });
    }

    function dashboard() {
        history.push('/dashboard');
    }
    function orders() {
        history.push('/orders');
    }
    function account() {
        history.push('/account');
    }
    function cart() {
        history.push('/cart');
    }
    function logoutUser() {
        dispatch(logout());
        alert.success('Đăng xuất thành công');
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: '10' }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: '11' }}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                        alt="Profile"
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;
