import React, { Fragment, useEffect, useState } from 'react';
import './NewProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, newBill } from '../../actions/billAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from './Sidebar';
import { NEW_BILL_RESET } from '../../constants/billConstants';
import {
    getAdminProduct
} from '../../actions/productAction';
import HomeIcon from '@material-ui/icons/Home';

const NewBill = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.newBill);
    const { products } = useSelector((state) => state.products);

    const [productId, setProductId] = useState('');
    const [provider, setProvider] = useState('');
    const [price, setPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [Stock, setStock] = useState(0);
    // console.log(productId);

    useEffect(() => {
        dispatch(getAdminProduct())
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Đã nhập hóa đơn');
            history.push('/admin/bills');
            dispatch({ type: NEW_BILL_RESET });
        }

    }, [dispatch, alert, error, history, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('productId', productId);
        myForm.set('provider', provider);
        myForm.set('price', price);
        myForm.set('total', total);
        myForm.set('Stock', Stock);

        dispatch(newBill(myForm));
    };

    return (
        <Fragment>
            <MetaData title="Nhập hóa đơn" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Nhập hóa đơn</h1>

                        <div>
                            <SpellcheckIcon />
                            <select
                                onChange={(e) => setProductId(e.target.value)}
                            >
                                <option>Chọn sản phẩm</option>
                                {products.map((product) => (
                                    <option value={product._id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Nhà cung cấp"
                                required
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Giá nhập"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Số lượng"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div>
                            <AttachmentTwoToneIcon />
                            <input
                                type="number"
                                placeholder="Tổng tiền"
                                required
                                onChange={(e) => setTotal(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Thêm phiếu nhập
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewBill;
