export const signupReducer = (state = {}, action) => {
    switch(action.type){
        case 'USER_REGISTER_REQUEST':
            return {
                loading : true,

            }
        case 'USER_REGISTER_SUCCESS':
            return {
                loading : false,
                success : true
            }
        case 'USER_REGISTER_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {state};
    }
}
export const getAllUsersReducer = (state = {}, action) => {
    switch(action.type){
        case 'GET_USER_REQUEST':
            return {
                loading : true,
                error: null

            }
        case 'GET_USER_SUCCESS':
            return {
                users: action.payload,
                loading : false,
                success : true
            }
        case 'GET_USER_FAIL':
            return {
                loading: false,
                error: action.payload,
                users: {},
            }
        default:
            return state;
    }
}



export const loginUserReducer = (state = {}, action)=> {
    switch(action.type){
        case "USER_LOGIN_REQUEST":
            return {
                loginLoading: true,
                loginSuccess: false
            };
        case "USER_LOGIN_SUCCESS":
            return{
                loginLoading:false,
                loginSuccess: true,
                currentUser: action.payload
            };
        case "USER_LOGIN_FAIL":
            return {
                loginLoading: false,
                loginError: action.payload,
                loginSuccess: false
            };
        default :
            return state;
    }
} 

export const resetPasswordReducer = (state = {}, action)=> {
    switch(action.type){
        case "USER_RESET_PASSWORD_REQUEST":
            return {
                loading: true,
                success: null,
                error: null

            };
        case "USER_RESET_PASSWORD_SUCCESS":
            return{
                loading:false,
                success: true,
            };
        case "USER_RESET_PASSWORD_FAIL":
            return {
                loading: false,
                success: false,
                error: action.payload
            };
        default :
            return state;
    }
} 
export const otpVerifyReducer = (state = {}, action)=> {
    switch(action.type){
        case "USER_OTP_REQUEST":
            return {
                ...state,
                otpVerifyloading: true,
                otpVerifysuccess: null,
                otpVerifyerror: null

            };
        case "USER_OTP_SUCCESS":
            return{
                ...state,
                otpVerifyloading:false,
                otpVerifysuccess: true,
                otpVerifyerror:null
            };
        case "USER_OTP_FAIL":
            return {
                otpVerifyloading: false,
                otpVerifysuccess: false,
                otpVerifyerror: action.payload
            };
        default :
            return state;
    }
}

export const changePasswordReducer = (state = {}, action)=> {
    switch(action.type){
        case "CHANGE_USER_PASSWORD_REQUEST":
            return {
                ...state,
                changePasswordloading: true,
                changePasswordsuccess: null,
                changePassworderror: null

            };
        case "CHANGE_USER_PASSWORD_SUCCESS":
            return{
                ...state,
                changePasswordloading:false,
                changePasswordsuccess: true,
                changePassworderror:null
            };
        case "CHANGE_USER_PASSWORD_FAIL":
            return {
                changePasswordloading: false,
                changePasswordsuccess: false,
                changePassworderror: action.payload
            };
        default :
            return state;
    }
} 


export const deleteUserReducer  = (state = {}, action)=> {
    switch(action.type){
        case "DELETE_USER_REQUEST":
            return {
                ...state,
                deleteUserloading: true,
                deleteUsersuccess: null,
                deleteUsererror: null

            };
        case "DELETE_USER_SUCCESS":
            return{
                ...state,
                deleteUserloading:false,
                deleteUsersuccess: true,
                deleteUsererror:null
            };
        case "DELETE_USER_FAIL":
            return {
                deleteUserloading: false,
                deleteUsersuccess: false,
                deleteUsererror: action.payload
            };
        default :
            return state;
    }
}

export const makeAdminReducer  = (state = {}, action)=> {
    switch(action.type){
        case "MAKE_ADMIN_REQUEST":
            return {
                ...state,
                makeAdminloading: true,
                makeAdminsuccess: null,
                makeAdminerror: null

            };
        case "MAKE_ADMIN_SUCCESS":
            return{
                ...state,
                makeAdminloading:false,
                makeAdminsuccess: true,
                makeAdminerror:null
            };
        case "MAKE_ADMIN_FAIL":
            return {
                makeAdminloading: false,
                makeAdminsuccess: false,
                makeAdminerror: action.payload
            };
        default :
            return state;
    }
}

export const removeAdminReducer  = (state = {}, action)=> {
    switch(action.type){
        case "REMOVE_ADMIN_REQUEST":
            return {
                ...state,
                removeAdminloading :true,
                removeAdminsuccess : null,
                removeAdminerror : null
            }
        case "REMOVE_ADMIN_SUCCESS":
            return{
                ...state,
                removeAdminloading :false,
                removeAdminsuccess : true,
                removeAdminerror : null
            }
        case "REMOVE_ADMIN_FAIL" :
            return{
                removeAdminloading :false,
                removeAdminsuccess : false,
                removeAdminerror : action.payload
            }
        default :
            return state;
    }
}


export const makeWorkerReducer  = (state = {}, action)=> {
    switch(action.type){
        case "REMOVE_ADMIN_REQUEST":
            return {
                ...state,
                makeWorkerloading :true,
                makeWorkersuccess : null,
                makeWorkererror : null
            }
        case "REMOVE_ADMIN_SUCCESS":
            return{
                ...state,
                makeWorkerloading :false,
                makeWorkersuccess : true,
                makeWorkererror : null
            }
        case "REMOVE_ADMIN_FAIL" :
            return{
                makeWorkerloading :false,
                makeWorkersuccess : false,
                makeWorkererror : action.payload
            }
        default :
            return state;
    }
}


export const updateUserImageReducer  = (state = {}, action)=> {
    switch(action.type){
        case "EDIT_USER_REQUEST":
            return {
                ...state,
                upadateUserImgloading :true,
                upadateUserImgsuccess : null,
                upadateUserImgerror : null
            }
        case "EDIT_USER_SUCCESS":
            return{
                ...state,
                upadateUserImgloading :false,
                upadateUserImgsuccess : true,
                upadateUserImgerror : null
            }
        case "EDIT_USER_FAIL" :
            return{
                upadateUserImgloading :false,
                upadateUserImgsuccess : false,
                upadateUserImgerror : action.payload
            }
        default :
            return state;
    }
}