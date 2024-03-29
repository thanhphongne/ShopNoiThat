import React, { Fragment } from 'react';
import './Sidebar.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { orders } = useSelector((state) => state.allOrders);
    const { user } = useSelector((state) => state.user);

    return (
        <div className="sidebar">
            <Link to="/admin/dashboard">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon /> Thống kê
                </p>
            </Link>
            {user && user.role !== 'Nhân viên kho' && (
                <Fragment>
                    <Link to="/admin/orders">
                        <p>
                            <ListAltIcon />
                            Đơn Hàng(
                            {orders &&
                                orders.filter(
                                    (order) =>
                                        order.orderStatus === 'Chờ xác nhận',
                                ).length}
                            )
                        </p>
                    </Link>
                    <Link>
                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<BookOutlinedIcon />}
                        >
                            <TreeItem nodeId="1" label="Bài viết">
                                <Link to="/admin/blogs">
                                    <TreeItem
                                        nodeId="2"
                                        label="Tát cả bài viết"
                                        icon={<PostAddIcon />}
                                    />
                                </Link>

                                <Link to="/admin/blog">
                                    <TreeItem
                                        nodeId="3"
                                        label="Thêm bài viết mới"
                                        icon={<AddIcon />}
                                    />
                                </Link>
                            </TreeItem>
                        </TreeView>
                    </Link>
                    <Link to="/admin/reviews">
                        <p>
                            <RateReviewIcon />
                            Đánh Giá
                        </p>
                    </Link>
                </Fragment>
            )}

            {user && user.role !== 'Nhân viên bán hàng' && (
                <Fragment>
                    <Link>
                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ImportExportIcon />}
                        >
                            <TreeItem nodeId="1" label="Sản Phẩm">
                                <Link to="/admin/products">
                                    <TreeItem
                                        nodeId="2"
                                        label="Tát cả sản phẩm"
                                        icon={<PostAddIcon />}
                                    />
                                </Link>

                                <Link to="/admin/product">
                                    <TreeItem
                                        nodeId="3"
                                        label="Thêm sản phẩm mới"
                                        icon={<AddIcon />}
                                    />
                                </Link>
                            </TreeItem>
                        </TreeView>
                    </Link>

                    <Link>
                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<DescriptionIcon />}
                        >
                            <TreeItem nodeId="1" label="Phiếu nhập">
                                <Link to="/admin/bills">
                                    <TreeItem
                                        nodeId="2"
                                        label="Danh sách phiếu nhận"
                                        icon={<PostAddIcon />}
                                    />
                                </Link>

                                <Link to="/admin/bill">
                                    <TreeItem
                                        nodeId="3"
                                        label="Thêm phiếu nhận mới"
                                        icon={<AddIcon />}
                                    />
                                </Link>
                            </TreeItem>
                        </TreeView>
                    </Link>
                </Fragment>
            )}

            {
                (user && user.role === 'admin') && (
                    <Link>
                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<PeopleIcon />}
                        >
                            <TreeItem nodeId="1" label="Nhân viên">
                                <Link to="/admin/users">
                                    <TreeItem
                                        nodeId="2"
                                        label="Danh sách nhân viên"
                                        icon={<PostAddIcon />}
                                    />
                                </Link>
                                <Link to="/admin/user">
                                    <TreeItem
                                        nodeId="3"
                                        label="Thêm nhân viên"
                                        icon={<AddIcon />}
                                    />
                                </Link>
                            </TreeItem>
                        </TreeView>
                    </Link>
                )
            }
        </div>
    );
};

export default Sidebar;
