import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { useSelector } from 'react-redux';
import './Profile.css';

const Proflie = ({ history }) => {
    const { user, loading, isAuthenticated } = useSelector(
        (state) => state.user,
    );
    const link = user.role === 'shipper' ? '/shipper/myorders' : '/orders';

    useEffect(() => {
        if (isAuthenticated === false) {
            history.push('/login');
        }
    }, [history, isAuthenticated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}`} />
                    <div className="profileContainer">
                        <div>
                            <h1>Trang Cá Nhân</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Cập nhật thông tin</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Họ Và Tên</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Tham Gia</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>
                            <div>
                                <Link to={link}>Đơn Hàng</Link>
                                <Link to="/password/update">Đổi Mật Khẩu</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Proflie;
