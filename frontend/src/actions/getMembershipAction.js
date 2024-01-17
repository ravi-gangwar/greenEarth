import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const BASE_URL = import.meta.env.VITE_BACKED_DOMAIN;

export const getMembershipAction = ({ _id, membership }) => async (dispatch) => {
    try {
        const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_PRIVATE_KEY}`);

        dispatch({ type: 'GET_MEMBERSHIP_REQUEST' });

        const response = await axios.post(`${BASE_URL}/api/orders/get-membership`, { _id, membership }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;
        const { error, paymentIntent } = await stripe.redirectToCheckout({ sessionId: data.id });

        if (error) {
            dispatch({ type: 'GET_MEMBERSHIP_FAIL', payload: { error: error.message } });
            console.error(error.message);
        } else if (paymentIntent) {
            // Handle successful checkout
            dispatch({ type: 'GET_MEMBERSHIP_SUCCESS' });
        }
    } catch (error) {
        // Log more details about the error
        dispatch({ type: 'GET_MEMBERSHIP_FAIL', payload: { error: error.message } });
        console.error(error.message);
    }
};
