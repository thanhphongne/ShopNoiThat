import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAllBlogs,
    deleteBlog,
} from "../../actions/blogAction";
import { getAllUsers } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_BLOG_RESET } from "../../constants/blogConstants";

const BlogsList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { users } = useSelector((state) => state.allUsers);
    const { error, blogs } = useSelector((state) => state.blogs);

    
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.blog
    );

    const deleteBillHandler = (id) => {
        dispatch(deleteBlog(id));
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
        alert.success("Đã xóa hóa đơn");
        history.push("/admin/blogs");
        dispatch({ type: DELETE_BLOG_RESET });
        }

        dispatch(getAllBlogs());
        dispatch(getAllUsers());
        

    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
        { field: "id", headerName: "Mã bài viết", minWidth: 200, flex: 0.4 },
        {
            field: "user",
            headerName: "Tác giả",
            minWidth: 150,
            flex: 0.35,
        },
        {
            field: "name",
            headerName: "Tên bài viết",
            minWidth: 150,
            flex: 0.6,
        },
        
        {
        field: "date",
        headerName: "Ngày tạo",
        type: "datetime",
        minWidth: 100,
        flex: 0.2,
        },
        {
        field: "actions",
        flex: 0.2,
        headerName: "Hành động",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
            return (
            <Fragment>
                <Link to={`/admin/blog/${params.getValue(params.id, "id")}`}>
                <EditIcon />
                </Link>

                <Button
                onClick={() =>
                    deleteBillHandler(params.getValue(params.id, "id"))
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

    blogs &&
        blogs.forEach((item) => {
        rows.push({
            id: item._id,
            user: users && users.filter(user => user._id === item.user).map(user => user.name),
            name: item.title,
            date: item.createAt.substring(0,10)
        });
        });

    return (
        <Fragment>
        <MetaData title={`Tất cả hóa đơn - Quản trị`} />

        <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
            <h1 id="productListHeading">Tất cả bài viết</h1>
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

export default BlogsList;