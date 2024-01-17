import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKED_DOMAIN;

export const signupAction = (user) => async dispatch => {
    dispatch({type: 'USER_REGISTER_REQUEST'});
    try {
        await axios.post(`${BASE_URL}/api/auth/signup`, {user: user});
        dispatch({type: 'USER_REGISTER_SUCCESS'});
    } catch (error) {
        dispatch({type: 'USER_REGISTER_FAIL', payload: error});
    }
}

export const loginAction = (user) => async dispatch => {
    dispatch({type: 'USER_LOGIN_REQUEST'});
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/login`, user);
        dispatch({type: 'USER_LOGIN_SUCCESS', payload: res.data});
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        if(res.data.success === true){
            window.location.href = '/';
        }
        if(res.data.succuess === false){
            console.log(res.data, "this is f response");
            dispatch({type: "USER_LOGIN_FAIL", payload: res.data});
        }
    } catch (error) {
        dispatch({type: "USER_LOGIN_FAIL", payload: error});
    }
}

export const logoutAction = () => () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
}

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: 'GET_USER_REQUEST' });

    try {
        const res = await axios.get(`${BASE_URL}/api/auth/getall-users`);
        dispatch({ type: 'GET_USER_SUCCESS', payload: res.data });
    } catch (error) {
        if (error.response) {
            dispatch({ type: 'GET_USER_FAIL', payload: error.response.data });
        } else if (error.request) {
            dispatch({ type: 'GET_USER_FAIL', payload: 'No response received from the server.' });
        } else {
            dispatch({ type: 'GET_USER_FAIL', payload: 'An error occurred while making the request.' });
        }
    }
};

export const resetAction = (email, userId) => async dispatch => {
    dispatch({type: 'USER_RESET_PASSWORD_REQUEST'});
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/reset-password`, {email : email, _id: userId});
        dispatch({type: 'USER_RESET_PASSWORD_SUCCESS', payload: res.data});
        console.log(res.data);
    } catch (error) {
        dispatch({type: "USER_RESET_PASSWORD_FAIL", payload: error});
    }
}

export const otpVerifyAction = (email, otp) => async dispatch => {
    dispatch({type: 'USER_OTP_REQUEST'});
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {email : email, code: otp});
        dispatch({type: 'USER_OTP_SUCCESS', payload: res.data});
    } catch (error) {
        dispatch({type: "USER_OTP_FAIL", payload: error});
    }
}

export const changePasswordAction = ({email, newPassword}) => async dispatch => {
    dispatch({type: 'CHANGE_USER_PASSWORD_REQUEST'});
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/change-password`, {email, newPassword});
        dispatch({type: 'CHANGE_USER_PASSWORD_SUCCESS', payload: res.data});
    } catch (error) {
        dispatch({type: "CHANGE_USER_PASSWORD_FAIL", payload: error});
    }
}

export const deleteUserAction = (userId) => async dispatch => {
    dispatch({type: 'DELETE_USER_REQUEST'});
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/delete-user`, {_id: userId});
        dispatch({type: 'DELETE_USER_SUCCESS', payload: res.data});
        window.location.reload(false);
    } catch (error) {
        dispatch({type: "DELETE_USER_FAIL", payload: error});
    }
}

export const makeAdminAction = (userId) => async dispatch => {
    dispatch({type: 'MAKE_ADMIN_REQUEST'});
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/make-admin`, {_id: userId});
        dispatch({type: 'MAKE_ADMIN_SUCCESS', payload: res.data});
        window.location.reload(false);
    } catch (error) {
        dispatch({type: "MAKE_ADMIN_FAIL", payload: error});
    }
}

export const removeAdminAction = (userId) => async dispatch => {
    dispatch({type: 'REMOVE_ADMIN_REQUEST'});
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/remove-admin`, {_id: userId});
        dispatch({type: 'REMOVE_ADMIN_SUCCESS', payload: res.data});
        window.location.reload(false);
    } catch (error) {
        dispatch({type: "REMOVE_ADMIN_FAIL", payload: error});
    }
}

export const makeWorkerAction = (userId) => async dispatch => {
    dispatch({type: 'MAKE_WORKER_REQUEST'});
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/make-worker`, {_id: userId});
        dispatch({type: 'MAKE_WORKER_SUCCESS', payload: res.data});
        window.location.reload(false);
    } catch (error) {
        dispatch({type: "MAKE_WORKER_FAIL", payload: error});
    }
}


export const updateUserAction = ({updatedUser, /*formData*/}) => async (dispatch) => {
  dispatch({ type: 'EDIT_USER_REQUEST' });
  try {
    let res;
    // let updateProfileRes;
    // if(formData){
    //     updateProfileRes = await axios.post(`${BASE_URL}/api/upload/profile-upload`, formData);
    // }
    // if(updatedUser || (formData && updateProfileRes)){
    //     updatedUser = {
    //         ...updatedUser,
    //         avatar: updateProfileRes.data.data[0]
    //     }
        res = await axios.post(`${BASE_URL}/api/auth/update-user`, updatedUser);
    // }

    dispatch({ type: 'EDIT_USER_SUCCESS', payload: res.data });
    alert("We are using free Deployment of our server so cant upload your profile picture.⛔⛔")
    window.location.reload(false);
  } catch (error) {
    dispatch({ type: 'EDIT_USER_IMAGE_FAIL', payload: error });
  }
};

