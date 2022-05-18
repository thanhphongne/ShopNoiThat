import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SideBar from './Sidebar';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import {
    getUserDetails,
    updateUser,
    clearErrors,
} from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';

const UpdateUser = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, user } = useSelector((state) => state.userDetails);

    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.profile);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [role, setRole] = useState('');

    const userId = match.params.id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setPhoneNo(user.phoneNo)
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (phoneNo && phoneNo.length < 10) {
            alert.error('Số điện thoại không đúng');
            return;
        }

        if (isUpdated) {
            alert.success('Cập nhật thành công');
            history.push('/admin/users');
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, updateError,phoneNo, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('phoneNo', phoneNo);
        myForm.set('email', email);
        myForm.set('role', role);

        dispatch(updateUser(userId, myForm));
    };

    return (
        <Fragment>
            <MetaData title="Cập nhật người dùng" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Cập nhật nhân viên</h1>

                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Tên"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <LocalPhoneIcon />
                                <input
                                    type="phoneNo"
                                    placeholder="Số điện thoại"
                                    required
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />
                            </div>
                            <div>
                                <VerifiedUserIcon />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Vai trò</option>
                                    <option value="admin">Quản trị</option>
                                    <option value="shipper">Người giao hàng</option>
                                    <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
                                    <option value="Nhân viên kho">Nhân viên kho</option>
                                </select>
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={
                                    updateLoading
                                        ? true
                                        : false || role === ''
                                        ? true
                                        : false
                                }
                            >
                                Cập nhật
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;
