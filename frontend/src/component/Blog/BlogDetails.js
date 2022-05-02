import React, { Fragment, useEffect} from 'react';
import './BlogDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getBlogDetails } from '../../actions/blogAction';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import Carousel from 'react-material-ui-carousel';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const BlogDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { blog, loading, error } = useSelector(
        (state) => state.blogDetails,
    );
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getBlogDetails(match.params.id));
    }, [dispatch, match.params.id, error, alert]);

    
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        
        dispatch(getBlogDetails(match.params.id))
    }, [dispatch, error, alert, match.params.id, ])
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${blog.title} -- Nội Thất Cần Thơ`} />
                    <div className="BlogDetails">
                        <div className="top-blogdetail">
                            <h1>{blog && blog.title}</h1>
                        </div>
                        <div className='bottom-blogdetail'>
                            <div className="left-blogdetail">
                                <TransformWrapper>
                                    <TransformComponent><Carousel height='30vh'>
                                        {blog.images &&
                                            blog.images.map((item, i) => (
                                                <img
                                                    className="CarouselImage"
                                                    key={item.url}
                                                    src={item.url}
                                                    alt={`${i} Slide`}
                                                />
                                            ))}</Carousel>
                                    </TransformComponent>
                                </TransformWrapper>
                            </div>
                            <div className="right-blogdetail">
                            <p>{blog && blog.content}</p>
                            </div>
                        </div>
                        
                        
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default BlogDetails;
