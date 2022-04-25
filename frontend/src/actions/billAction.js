import axios from 'axios';

import {
    ALL_BILL_FAIL,
    ALL_BILL_REQUEST,
    ALL_BILL_SUCCESS,
    NEW_BILL_REQUEST,
    NEW_BILL_SUCCESS,
    NEW_BILL_FAIL,
    UPDATE_BILL_REQUEST,
    UPDATE_BILL_SUCCESS,
    UPDATE_BILL_FAIL,
    DELETE_BILL_REQUEST,
    DELETE_BILL_SUCCESS,
    DELETE_BILL_FAIL,
    BILL_DETAILS_REQUEST,
    BILL_DETAILS_SUCCESS,
    BILL_DETAILS_FAIL,
    CLEAR_ERRORS,
} from '../constants/billConstants';

// Get All Bills For Admin
export const getAllBills = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BILL_REQUEST });
    
        const { data } = await axios.get("/api/v1/admin/bills");
    
        dispatch({
            type: ALL_BILL_SUCCESS,
            payload: data.bills,
        });
        } catch (error) {
        dispatch({
            type: ALL_BILL_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getBillDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BILL_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/bill/${id}`);

        dispatch({
            type: BILL_DETAILS_SUCCESS,
            payload: data.bill,
        });
    } catch (error) {
        dispatch({
            type: BILL_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newBill = (billData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_BILL_REQUEST });
        
        const config = {
            headers: { "Content-Type": "application/json" },
        };
    
        const { data } = await axios.post(
            `/api/v1/admin/bill/new`,
            billData,
            config
        );
    
        dispatch({
            type: NEW_BILL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_BILL_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update bill
export const updateBill = (id, billData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BILL_REQUEST });
        
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        
        const { data } = await axios.put(
            `/api/v1/admin/bill/${id}`,
            billData,
            config
            );
            
            dispatch({
            type: UPDATE_BILL_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BILL_FAIL,
        payload: error.response.data.message,
    });
    }
};
// Delete Bill
export const deleteBill = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BILL_REQUEST });
        
        const { data } = await axios.delete(`/api/v1/admin/bill/${id}`);
        
        dispatch({
            type: DELETE_BILL_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
    dispatch({
        type: DELETE_BILL_FAIL,
        payload: error.response.data.message,
    });
    }
};
//clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};