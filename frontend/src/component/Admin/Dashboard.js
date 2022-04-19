import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

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
    }, [dispatch]);

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
        totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: [" ", "Doanh thu hiên tại"],
        datasets: [
        {
            label: "DOANH THU",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
        },
        ],
    };

    const doughnutState = {
        labels: ["Hết hàng", "Còn hàng"],
        datasets: [
        {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
        },
        ],
    };

    return (
        <div className="dashboard">
        <MetaData title="Quản Trị" />
        <Sidebar />

        <div className="dashboardContainer">
            <Typography component="h1">Quản Trị</Typography>

            <div className="dashboardSummary">
            <div >
                <p>
                Tổng Doanh Thu <br />{totalAmount.toLocaleString()} VND
                </p>
                
            </div>
            <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                <p>Sản Phẩm</p>
                <p>{products && products.length}</p>
                </Link>
                <Link to="/admin/orders">
                <p>Đơn Hàng</p>
                <p>{orders && orders.length}</p>
                </Link>
                <Link to="/admin/users">
                <p>Người dùng</p>
                <p>{users && users.length}</p>
                </Link>
            </div>
            </div>

            <div className="lineChart">
            <Line data={lineState} />
            </div>

            <div className="doughnutChart">
            <Doughnut data={doughnutState} />
            </div>
        </div>
        </div>
    );
};

export default Dashboard;