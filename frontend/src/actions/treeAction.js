import axios from 'axios';

export const getAllTree = (page) => async (dispatch) => {
    dispatch({ type: 'GET_TREE_REQUEST' });
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKED_DOMAIN}/api/trees/getall?page=${page}`);
        dispatch({ type: 'GET_TREE_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'GET_TREE_FAIL', payload: error });
    }
}
export const getTreeWithType = () => async (dispatch) => {
    dispatch({ type: 'GET_TYPE_TREE_REQUEST' });
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKED_DOMAIN}/api/trees/get-all-type`);
        dispatch({ type: 'GET_TYPE_TREE_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'GET_TYPE_TREE_FAIL', payload: error });
    }
}

export const addTree = (treeData) => async (dispatch) => {
    dispatch({ type: 'ADD_TREE_REQUEST' });
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKED_DOMAIN}/api/trees/addtree`, treeData);
        dispatch({ type: 'ADD_TREE_SUCCESS', payload: res.data });
        window.location.reload(false);
    } catch (error) {
        dispatch({ type: 'RESET_ADD_TREE_STATE', payload: error.message || 'An error occurred' });
    }
};

export const getTreeById = (treeId) => async (dispatch) => {
    dispatch({ type: 'GET_TREE_BY_ID_TREE_REQUEST' });
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKED_DOMAIN}/api/trees/get-tree`, treeId);
        dispatch({ type: 'GET_TREE_BY_ID_TREE_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'RESET_GET_TREE_BY_ID_TREE_STATE', payload: error.message || 'An error occurred' });
    }
};

export const updateTree = (updatedTree) => async (dispatch) => {
    dispatch({ type: 'UPDATE_TREE_BY_ID_TREE_REQUEST' });
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKED_DOMAIN}/api/trees/update-tree`, updatedTree);
        dispatch({ type: 'UPDATE_TREE_BY_ID_TREE_SUCCESS', payload: res.data });
        console.log(res.data);
    } catch (error) {
        dispatch({ type: 'RESET_UPDATE_TREE_BY_ID_TREE_STATE', payload: error.message || 'An error occurred' });
    }
};

export const deleteTree = (deleteTreeId) => async (dispatch) => {
    dispatch({ type: 'DELETE_TREE_BY_ID_TREE_REQUEST' });
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKED_DOMAIN}/api/trees/delete-tree`, { treeId: deleteTreeId });
        dispatch({ type: 'DELETE_TREE_BY_ID_TREE_SUCCESS', payload: res.data });
        window.location.reload(false);
    } catch (error) {
        dispatch({ type: 'RESET_DELETE_TREE_BY_ID_TREE_STATE', payload: error.message || 'An error occurred' });
    }
};
