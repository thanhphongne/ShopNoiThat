import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    updateBill,
    getBillDetails,
} from "../../actions/billAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AttachmentTwoToneIcon from "@material-ui/icons/AttachmentTwoTone";
import MetaData from "../layout/MetaData";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_BILL_RESET } from "../../constants/billConstants";

const UpdateBill = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, bill } = useSelector((state) => state.billDetails);
    const { user, isAuthenticated } = useSelector(
        (state) => state.user,
    );


    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.bill);
    const { products } = useSelector((state) => state.products);


    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState('');
    const [Stock, setStock] = useState('');


    const billId = match.params.id;

    useEffect(() => {
        if (bill && bill._id !== billId) {
        dispatch(getBillDetails(billId));
        } else {
            setProductId(bill.productId)
            setStock(bill.Stock)
            setPrice(bill.price)
            setTotal(bill.total)
        }
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }
        if (isAuthenticated === false) {
            history.push('/login');
        }

        if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
        }

        if (isUpdated) {
        alert.success("Cập nhật hóa đơn thành công");
        history.push("/admin/bills");
        dispatch({ type: UPDATE_BILL_RESET });
        }
    }, [
        dispatch,
        alert,
        error,
        history,
        isUpdated,
        billId,
        bill,
        updateError,
        isAuthenticated,
    ]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("productId", productId);
        myForm.set("price", price);
        myForm.set("total", total);
        myForm.set("Stock", Stock);
        myForm.set('user', user._id);
        dispatch(updateBill(billId, myForm));
    };

    return (
        <Fragment>
        <MetaData title="Cập nhật hóa đơn" />
        <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
            <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
            >
                <h1>Cập nhật hóa đơn</h1>

                <div>
                <SpellcheckIcon />
                <select onChange={(e) => setProductId(e.target.value)}>
                    <option value={productId}>{products.filter(product => product._id === productId).map(product => product.name)}</option>
                    {products.map(product => (
                        <option value={product._id}>{product.name}</option>
                    ))}
                </select>
                </div>
                
                <div>
                <AttachMoneyIcon />
                <input
                    type="number"
                    placeholder="Giá nhập"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                />
                </div>

                
                <div>
                <StorageIcon />
                <input
                    type="number"
                    placeholder="Số lượng"
                    value={Stock}
                    required
                    onChange={(e) => setStock(e.target.value)}
                />
                </div>

                <div>
                <AttachmentTwoToneIcon />
                <input
                    type="number"
                    placeholder="Tổng tiền"
                    value={total}
                    required
                    onChange={(e) => setTotal(e.target.value)}
                />
                </div>

                <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
                >
                Cập nhật
                </Button>
            </form>
            </div>
        </div>
        </Fragment>
    );
};

export default UpdateBill;