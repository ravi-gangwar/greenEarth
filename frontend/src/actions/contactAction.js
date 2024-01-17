import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKED_DOMAIN;

export const contactAction = (contactMessage) => async (dispatch) => {
    console.log(contactMessage);
    dispatch({ type: 'USER_CONTACT_REQUEST' });
    try {
        const res = await axios.post(`${BASE_URL}/api/user-message/contact`, { contactMessage });
        dispatch({ type: 'USER_CONTACT_SUCCESS', payload: res.data });
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Server error while sending message';
        dispatch({ type: 'USER_CONTACT_FAIL', payload: errorMessage });
    }
};
