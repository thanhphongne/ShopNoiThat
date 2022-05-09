import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.js';
import './Dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';
import { getAllBills } from '../../actions/billAction.js';
import MetaData from '../layout/MetaData';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    const { bills } = useSelector((state) => state.bills);

    const [month, setMonth] = useState('');

    let year = month.length > 0 ? month.slice(0,4) : '';
    let thang = month.length > 0 ? month.slice(5,7) : '';


    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
        dispatch(getAllBills());
    }, [dispatch]);

    let totalAmount = 0;
    let totalBill = 0;
    (orders && month.length === 0) &&
        orders
            .filter((item) => item.orderStatus === 'Đã nhận hàng')
            .forEach((item) => {
                totalAmount += item.totalPrice;
            });

    (orders && month.length > 0) &&
    orders
        .filter((item) => item.orderStatus === 'Đã nhận hàng')
        .filter(item => (
            item.createdAt.slice(0,4) === year
            ))
        .filter(item => item.createdAt.slice(5,7) === thang)
        .forEach((item) => {
            totalAmount += item.totalPrice;
        });
    (bills && month.length === 0) &&
        bills.forEach((item) => {
            totalBill += item.total;
        });
    (bills && month.length > 0) &&
        bills
        .filter(item => (
            item.createAt.slice(0,4) === year
            ))
        .filter(item => item.createAt.slice(5,7) === thang)
        .forEach((item) => {
            totalBill += item.total;
        });

    const lineState = {
        labels: [' ', 'Hiện tại'],
        datasets: [
            {
                label: 'DOANH THU',
                backgroundColor: ['tomato'],
                hoverBackgroundColor: ['rgb(197, 72, 49)'],
                data: [0, totalAmount],
            },
            {
                label: 'TIỀN HÀNG',
                backgroundColor: ['navi'],
                hoverBackgroundColor: ['rgb(97, 72, 49)'],
                data: [0, totalBill],
            },
        ],
    };

    const doughnutState = {
        labels: ['Hết hàng', 'Còn hàng'],
        datasets: [
            {
                backgroundColor: ['#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['#4B5000', '#35014F'],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    let SaleProductName = [];
    let SaleProductNum = [];

    products &&
        products.forEach((item) => {
            if (item.numOfSale > 0) {
                SaleProductName.push(item.name);
                SaleProductNum.push(item.numOfSale);
            }
        });

    const barState = {
        labels: SaleProductName,
        datasets: [
            {
                data: SaleProductNum,
            },
        ],
    };

    return (
        <div className="dashboard">
            <MetaData title="Thống kê" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Thống kê</Typography>
                <div className="filter">
                    <form>
                        <div className="month">
                            <p>Thời gian</p>
                            <input type="month" onChange={(e) => setMonth(e.target.value)}/>
                        </div>
                    </form>
                </div>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Tổng Doanh Thu <br />
                            {totalAmount.toLocaleString()} VND
                        </p>
                        <p>
                            Tổng Nhập Kho <br />
                            {totalBill.toLocaleString()} VND
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Sản Phẩm</p>
                            <p>{products && (month.length === 0 ? products.length : products.filter(item => (
                                item.createAt.slice(0,4) === year
                                ))
                            .filter(item => item.createAt.slice(5,7) === thang).length)}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Đơn Hàng</p>
                            <p>{orders && (month.length === 0 ? orders.length : orders.filter(item => (
                                item.createdAt.slice(0,4) === year
                                ))
                            .filter(item => item.createdAt.slice(5,7) === thang).length)}</p>
                        </Link>
                        <Link to="/admin/bills">
                            <p>Hóa đơn</p>
                            <p>{bills && (month.length === 0 ? bills.length : bills.filter(item => (
                                item.createAt.slice(0,4) === year
                                ))
                            .filter(item => item.createAt.slice(5,7) === thang).length)}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Người dùng</p>
                            <p>{users && (month.length === 0 ? users.length : users.filter(item => (
                                item.createdAt.slice(0,4) === year
                                ))
                            .filter(item => item.createdAt.slice(5,7) === thang).length)}</p>
                        </Link>
                    </div>
                </div>
                
                <div className="lineChart">
                    <Line data={lineState} />
                </div>


                {SaleProductNum.length > 0 && (
                    <div className="lineChart">
                        <Bar data={barState} />
                    </div>
                )}

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
