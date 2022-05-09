import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    clearErrors,
    updateBlog,
    getBlogDetails,
} from '../../actions/blogAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import SideBar from './Sidebar';
import { UPDATE_BLOG_RESET } from '../../constants/blogConstants';

const UpdateBlog = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, blog } = useSelector((state) => state.blogDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.blog);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const blogId = match.params.id;

    useEffect(() => {
        if (blog && blog._id !== blogId) {
            dispatch(getBlogDetails(blogId));
        } else {
            setTitle(blog.title);
            setContent(blog.content);
            setOldImages(blog.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Cập nhật bài viết thành công');
            history.push('/admin/blogs');
            dispatch({ type: UPDATE_BLOG_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, blogId, blog, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('title', title);
        myForm.set('content', content);

        images.forEach((image) => {
            myForm.append('images', image);
        });
        dispatch(updateBlog(blogId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Cập nhật sản phẩm" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                        style={{ width: '60vmax' }}
                    >
                        <h1>Cập nhật bài viết</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Tên bài viết"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Nội dung"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                cols="30"
                                rows="1"
                                style={{ height: '25vh' }}
                            ></textarea>
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt="Ảnh sản phẩm"
                                    />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt="Ảnh sản phẩm"
                                />
                            ))}
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

export default UpdateBlog;
