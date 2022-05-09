import React, { Fragment, useRef, useState, useEffect } from 'react';
import './LoginShipper.css';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginShipper } from '../../actions/userAction';
import { useAlert } from 'react-alert';

const LoginShipper = ({ history, location }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated, role } = useSelector(
        (state) => state.user,
    );

    const loginTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginShipper(loginEmail, loginPassword));
    };

    const redirect = location.search
        ? location.search.split('=')[1]
        : '/shipper/myorders';

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            history.push(redirect);
        }
    }, [dispatch, error, alert, history, isAuthenticated, redirect, role]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p>ĐĂNG NHẬP SHIPPER</p>
                                </div>
                            </div>
                            <form
                                className="loginForm"
                                ref={loginTab}
                                onSubmit={loginSubmit}
                            >
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) =>
                                            setLoginEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Mật khẩu"
                                        required
                                        value={loginPassword}
                                        onChange={(e) =>
                                            setLoginPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <Link to="/password/forgot">
                                    Quên mật khẩu ?
                                </Link>
                                <input
                                    type="submit"
                                    value="Đăng nhập"
                                    className="loginBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default LoginShipper;
