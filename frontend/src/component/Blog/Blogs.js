import React, { Fragment, useEffect } from 'react';
import './Blogs.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllBlogs } from '../../actions/blogAction';
import Loader from '../layout/Loader/Loader';
import BlogCard from '../Home/BlogCard';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';



const Blogs = () => {
    const dispatch = useDispatch();

    const alert = useAlert();
    const {
        blogs,
        loading,
        error,
    } = useSelector((state) => state.blogs);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllBlogs());
    }, [
        dispatch,
        alert,
        error,
    ]);



    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Tất cả bài viết -- Nội Thất Cần Thơ" />
                    <h2 className="blogHeading">Tất cả bài viết</h2>

                    <div className="blog">
                        {blogs &&
                            blogs.map((blog, index) => (
                                <BlogCard
                                    blog={blog}
                                    index={index}
                                />
                            ))}
                    </div>
                    
                </Fragment>
            )}
        </Fragment>
    );
};

export default Blogs;
