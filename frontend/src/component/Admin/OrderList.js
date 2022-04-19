import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
    deleteOrder,
    getAllOrders,
    clearErrors,
    } from "../../actions/orderAction";
    import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

    const OrderList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }

        if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
        }

        if (isDeleted) {
        alert.success("Đã xóa đơn hàng");
        history.push("/admin/orders");
        dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
        { field: "id", headerName: "Mã đơn hàng", minWidth: 300, flex: 0.5 },

        {
        field: "status",
        headerName: "Trạng thái",
        minWidth: 150,
        flex: 0.3,
        cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Đã nhận hàng"
            ? "greenColor"
            : "redColor";
        },
        },
        {
        field: "createdAt",
        headerName: "Ngày tạo",
        type: "date",
        minWidth: 150,
        flex: 0.4,
        },

        {
        field: "amount",
        headerName: "Giá",
        type: "number",
        minWidth: 270,
        flex: 0.5,
        },

        {
        field: "actions",
        flex: 0.5,
        headerName: "Hành động",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
            return (
            <Fragment>
                <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                <EditIcon />
                </Link>

                <Button
                onClick={() =>
                    deleteOrderHandler(params.getValue(params.id, "id"))
                }
                >
                <DeleteIcon />
                </Button>
            </Fragment>
            );
        },
        },
    ]; 

    const rows = [];

    orders &&
        orders.forEach((item) => {
        rows.push({
            id: item._id,
            createdAt: String(item.createdAt).substr(0, 16),
            amount: item.totalPrice,
            status: item.orderStatus,
        });
        });

    return (
        <Fragment>
        <MetaData title={`Tất cả đơn hàng - Quản trị`} />

        <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
            <h1 id="productListHeading">Tất cả đơn hàng</h1>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
            />
            </div>
        </div>
        </Fragment>
    );
};

export default OrderList;