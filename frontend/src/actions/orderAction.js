import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const BASE_URL = import.meta.env.VITE_BACKED_DOMAIN;

export const placeOrderAction = (reqBody) => async (dispatch) => {
    const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_PRIVATE_KEY}`);

    dispatch({ type: 'PLACE_ORDER_REQUEST' });

    try {
        const response = await axios.post(`${BASE_URL}/api/orders/placeorder`, reqBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = response.data;
        const { result, error } = await stripe.redirectToCheckout({ sessionId: data.id });

        if (error) {
            dispatch({ type: 'PLACE_ORDER_FAIL' });
            console.log('Error in Stripe Checkout:', error);
        } else {
            dispatch({ type: 'PLACE_ORDER_SUCCESS' });
            console.log('Order placed successfully:', result);
        }
    } catch (error) {
        dispatch({ type: 'PLACE_ORDER_FAIL', payload: { error } });
        console.log('Error in placing order:', error);
    }
};

export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser;
    dispatch({ type: 'USER_ORDER_REQUEST' });
    try {
        const res = await axios.post(`${BASE_URL}/api/orders/getorders`, { userId: currentUser.data._id });
        dispatch({ type: 'USER_ORDER_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'USER_ORDER_FAIL', payload: error });
    }
}

export const getAllOrders = () => async (dispatch) => {
    dispatch({ type: 'ALL_ORDER_REQUEST' });
    try {
        const res = await axios.post(`${BASE_URL}/api/orders/admin/getAllOrders`);
        dispatch({ type: 'ALL_ORDER_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'ALL_ORDER_FAIL', payload: error });
    }
}

export const deliveredOrderMark = (orderId) => async (dispatch) => {
    dispatch({ type: 'DELIVERED_ORDER_REQUEST' });
    try {
        const res = await axios.post(`${BASE_URL}/api/orders/admin/delivered-order`, { orderId });
        dispatch({ type: 'DELIVERED_ORDER_SUCCESS', payload: res.data });
        window.location.reload(false);
    } catch (error) {
        dispatch({ type: 'DELIVERED_ORDER_FAIL', payload: error });
    }
};

export const cancelOrderAction = (orderId) => async (dispatch) => {
    dispatch({ type: 'CANCEL_ORDER_REQUEST' });
    try {
        const res = await axios.post(`${BASE_URL}/api/orders/cancel-order`, { orderId });
        dispatch({ type: 'CANCEL_ORDER_SUCCESS', payload: res.data });
        window.location.reload(false);
    } catch (error) {
        dispatch({ type: 'CANCEL_ORDER_FAIL', payload: error });
    }
}
