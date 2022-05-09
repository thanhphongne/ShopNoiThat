import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, index }) => {
    const nameclass = index % 2 ? 'chan' : 'le';

    return (
        <Link className={nameclass} to={`/blog/${blog._id}`}>
            <div className="left ">
                <b>{blog.title}</b>
                <p>
                    <i>{blog.content}</i>
                </p>
            </div>
            <div className="right">
                <img src={blog.images[0].url} alt={blog.title} />
            </div>
        </Link>
    );
};

export default BlogCard;
