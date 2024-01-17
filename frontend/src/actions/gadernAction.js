import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKED_DOMAIN;

export const garderAction = ({ userId }) => async (dispatch) => {
    dispatch({ type: 'GADERN_TREE_BY_ID_TREE_REQUEST' });
    try {
        const res = await axios.post(`${BASE_URL}/api/trees/garden`, { userId });
        dispatch({ type: 'GADERN_TREE_BY_ID_TREE_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'GADERN_TREE_BY_ID_TREE_FAIL', payload: error });
    }
};
