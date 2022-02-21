import axios from 'axios';

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants';

export const getProduct =
    (keyword = '', currentPage = 1, price = [0, 100], category, ratings = 0) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCT_REQUEST });

            function multiplied(a, b) {
                return a * b;
            }

            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${multiplied(
                price[0],
                1000000,
            )}&price[lte]=${multiplied(
                price[1],
                1000000,
            )}&ratings[gte]=${ratings}`;

            if (category && category !== 'Tất cả') {
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${multiplied(
                    price[0],
                    1000000,
                )}&price[lte]=${multiplied(
                    price[1],
                    1000000,
                )}&category=${category}&ratings[gte]=${ratings}`;
            }
            const { data } = await axios.get(link);

            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
