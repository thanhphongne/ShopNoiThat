import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import DescriptionIcon from '@material-ui/icons/Description';
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { orders } = useSelector((state) => state.allOrders);

    return (
        <div className="sidebar">
        <Link to="/">
            <img src={logo} alt="Ecommerce" />
        </Link>
        <Link to="/admin/dashboard">
            <p>
            <DashboardIcon /> Quản Trị
            </p>
        </Link>
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
            >
            <TreeItem nodeId="1" label="Sản Phẩm">
                <Link to="/admin/products">
                <TreeItem nodeId="2" label="Tát cả sản phẩm" icon={<PostAddIcon />} />
                </Link>

                <Link to="/admin/product">
                <TreeItem nodeId="3" label="Thêm sản phẩm mới" icon={<AddIcon />} />
                </Link>
            </TreeItem>
            </TreeView>
        </Link>
        <Link to="/admin/orders">
            <p>
            <ListAltIcon />
            Đơn Hàng({orders && orders.filter( order => order.orderStatus === 'Chờ xác nhận').length})
            </p>
        </Link>
        <Link>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<DescriptionIcon/>}
            >
            <TreeItem nodeId="1" label="Hóa đơn">
                <Link to="/admin/bills">
                <TreeItem nodeId="2" label="Tát cả hóa đơn" icon={<PostAddIcon />} />
                </Link>

                <Link to="/admin/bill">
                <TreeItem nodeId="3" label="Thêm hóa đơn mới" icon={<AddIcon />} />
                </Link>
            </TreeItem>
            </TreeView>
        </Link>
        
        <Link to="/admin/users">
            <p>
            <PeopleIcon /> Người Dùng
            </p>
        </Link>
        <Link to="/admin/reviews">
            <p>
            <RateReviewIcon />
            Đánh Giá
            </p>
        </Link>
        </div>
    );
};

export default Sidebar;