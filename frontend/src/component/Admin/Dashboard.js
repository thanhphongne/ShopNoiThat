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
import { getAllBills } from "../../actions/billAction.js";
import MetaData from "../layout/MetaData";


const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    const { bills } = useSelector((state) => state.bills);


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
    let totalBill = 0
    orders &&
        orders.filter(item => item.orderStatus === 'Đã nhận hàng').forEach((item) => {
        totalAmount += item.totalPrice;
        });
    bills &&
        bills.forEach((item) => {
        totalBill += item.total;
        });

    const lineState = {
        labels: [" ", "Hiện tại"],
        datasets: [
        {
            label: "DOANH THU",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
        },
        {
            label: "TIỀN HÀNG",
            backgroundColor: ["navi"],
            hoverBackgroundColor: ["rgb(97, 72, 49)"],
            data: [0, totalBill],
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

    // let listProductSaled = new Array({})

    // orders && orders.forEach(order => {
    //     console.log(typeof order.orderItems);
    //     listProductSaled.push(order.orderItems)// choor nayf push do cai mang
    // })
    // console.log(listProductSaled);
    // let countProductSaled = [];

    // products && products.forEach(product => {
    //     let count = 0
    //     listProductSaled.filter(item => item.product === product._id)
    //     .forEach(item => {
    //         console.log(item);
    //         count += item.quantity
    //     })
    //     if(count>0) {
    //         countProductSaled.push(product.name, count)
    //     }
    // })
    // console.log(countProductSaled);

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
                <p>
                Tổng Tiền Hàng <br />{totalBill.toLocaleString()} VND
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
                <Link to="/admin/bills">
                <p>Hóa đơn</p>
                <p>{bills && bills.length}</p>
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