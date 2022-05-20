import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SideBar from './Sidebar';
import { createUser, clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';


const CreateUser = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isCreated, loading } = useSelector((state) => state.createUser);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [phoneNo, setPhoneNo] = useState('');


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (phoneNo && phoneNo.length < 10) {
            alert.error('Số điện thoại không đúng');
            return;
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isCreated) {
            alert.success('Tạo người dùng thành công');
            history.push('/admin/users');
        }
    }, [dispatch, alert, error, history, isCreated, phoneNo]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('phoneNo', phoneNo);
        myForm.set('password', '12345678');
        myForm.set('role', role);
        console.log(myForm);

        dispatch(createUser(myForm));
    };

    return (
        <Fragment>
            <MetaData title="Tạo người dùng" />
            <div className="dashboard">
                <SideBar />
                {loading ? (
                    <Loader />
                ) :(<div className="newProductContainer">
                    <form
                        className="createProductForm"
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h1>Tạo người dùng</h1>

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
                                <option value="Nhân viên kho">
                                    Nhân viên kho
                                </option>
                                <option value="Nhân viên bán hàng">
                                    Nhân viên bán hàng
                                </option>
                            </select>
                        </div>

                        <Button id="createProductBtn" type="submit">
                            Tạo
                        </Button>
                    </form>
                </div>)}
            </div>
        </Fragment>
    );
};
export default CreateUser;
