export const contactMessageReducer = (state = {}, action) => {
    switch (action.type) {
      case 'USER_CONTACT_REQUEST':
        return { 
            ...state, 
            loading: true,
            success: null,
            error : null,
        };
  
      case 'USER_CONTACT_SUCCESS':
        return {
            ...state, 
            loading: false,
            success: true,
            error : null,
        };
  
      case 'USER_CONTACT_FAIL':
        return {
            ...state, 
            loading: false,
            success: null,
            error : action.payload,
        };
  
      default:
        return state;
    }
  };