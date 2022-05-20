import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './ProductList.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllBills, deleteBill } from '../../actions/billAction';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from './Sidebar';
import { DELETE_BILL_RESET } from '../../constants/billConstants';
import { getAdminProduct } from '../../actions/productAction';
import { getAllUsers } from '../../actions/userAction';

const BillList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, bills } = useSelector((state) => state.bills);
    const { users } = useSelector((state) => state.allUsers);
    const { products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.bill,
    );

    const deleteBillHandler = (id) => {
        dispatch(deleteBill(id));
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
            alert.success('Đã xóa hóa đơn');
            history.push('/admin/bills');
            dispatch({ type: DELETE_BILL_RESET });
        }

        dispatch(getAllBills());
        dispatch(getAdminProduct());
        dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
        { field: 'id', headerName: 'Mã hóa đơn', minWidth: 200, flex: 0.55 },
        {
            field: 'user',
            headerName: 'Người nhập',
            minWidth: 150,
            flex: 0.35,
        },
        {
            field: 'name',
            headerName: 'Tên sản phẩm',
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: 'price',
            headerName: 'Đơn giá',
            type: 'number',
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: 'stock',
            headerName: 'Số lượng',
            type: 'number',
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: 'total',
            headerName: 'Tổng tiền',
            type: 'number',
            minWidth: 120,
            flex: 0.3,
        },
        {
            field: 'date',
            headerName: 'Ngày nhập',
            type: 'string',
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Hành động',
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link
                            to={`/admin/bill/${params.getValue(
                                params.id,
                                'id',
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteBillHandler(
                                    params.getValue(params.id, 'id'),
                                )
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

    bills &&
        bills.forEach((item) => {
            rows.push({
                id: item._id,
                user:
                    users &&
                    users
                        .filter((user) => user._id === item.user)
                        .map((user) => user.name),
                name:
                    products &&
                    products
                        .filter((product) => product._id === item.productId)
                        .map((product) => product.name),
                stock: item.Stock,
                price: item.price,
                total: item.total,
                date: item.createAt.substring(0, 10),
            });
        });

    return (
        <Fragment>
            <MetaData title={`Tất cả hóa đơn - Quản trị`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">Tất cả hóa đơn</h1>
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

export default BillList;
