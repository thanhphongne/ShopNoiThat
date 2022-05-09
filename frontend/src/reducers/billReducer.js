import {
    ALL_BILL_REQUEST,
    ALL_BILL_SUCCESS,
    ALL_BILL_FAIL,
    NEW_BILL_REQUEST,
    NEW_BILL_SUCCESS,
    NEW_BILL_FAIL,
    NEW_BILL_RESET,
    UPDATE_BILL_REQUEST,
    UPDATE_BILL_SUCCESS,
    UPDATE_BILL_FAIL,
    DELETE_BILL_REQUEST,
    DELETE_BILL_SUCCESS,
    DELETE_BILL_FAIL,
    UPDATE_BILL_RESET,
    DELETE_BILL_RESET,
    BILL_DETAILS_REQUEST,
    BILL_DETAILS_SUCCESS,
    BILL_DETAILS_FAIL,
    CLEAR_ERRORS,
} from '../constants/billConstants';

export const billsReducer = (state = { bills: [] }, action) => {
    switch (action.type) {
        case ALL_BILL_REQUEST:
            return {
                loading: true,
                bills: [],
            };
        case ALL_BILL_SUCCESS:
            return {
                loading: false,
                bills: action.payload,
            };

        case ALL_BILL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newBillReducer = (state = { bill: {} }, action) => {
    switch (action.type) {
        case NEW_BILL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_BILL_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                bill: action.payload.bill,
            };
        case NEW_BILL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_BILL_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const billReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BILL_REQUEST:
        case UPDATE_BILL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_BILL_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_BILL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_BILL_FAIL:
        case UPDATE_BILL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_BILL_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_BILL_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const billDetailsReducer = (state = { bill: {} }, action) => {
    switch (action.type) {
        case BILL_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case BILL_DETAILS_SUCCESS:
            return {
                loading: false,
                bill: action.payload,
            };
        case BILL_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
