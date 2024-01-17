export const orderPaymentReducer = (state = {}, action) => {
    switch (action.type) {
      case 'PLACE_ORDER_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case 'PLACE_ORDER_SUCCESS':
        return {
          ...state,
          loading: false,
          sessionId: action.payload.sessionId,
          error: null,
          success: true,
        };
  
      case 'PLACE_ORDER_FAIL':
        return {
          ...state,
          loading: false,
          sessionId: null,
          error: action.payload.error,
          success: false,
        };
  
      default:
        return state;
    }
  };
export const getUserOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'USER_ORDER_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'USER_ORDER_SUCCESS':
            return {
                loading: false,
                orders: action.payload
            }
        case 'USER_ORDER_FAIL':
            return {
                error: action.payload,
                loading: false
            }
        default: return state
    }
}
export const getAllUsersOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'ALL_ORDER_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'ALL_ORDER_SUCCESS':
            return {
                loading: false,
                orders: action.payload
            }
        case 'ALL_ORDER_FAIL':
            return {
                orders: [],
                error: action.payload,
                loading: false
            }
        default: 
            return state
    }
}

export const deliveredOrderMarkReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELIVERED_ORDER_REQUEST':
            return {
                deliveredLoading: true,
                ...state
            }
        case 'DELIVERED_ORDER_SUCCESS':
            return {
                deliveredLoading: false,
                errorDelivered: null,
            }
        case 'DELIVERED_ORDER_FAIL':
            return {

                errorDelivered: action.payload,
                deliveredLoading: false
            }
        default: 
            return state
    }
}

export const cancelOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CANCEL_ORDER_REQUEST':
            return {
                cancelLoading: true,
                cancelSuccess: false,
                ...state
            }
        case 'CANCEL_ORDER_SUCCESS':
            return {
                cancelLoading: false,
                cancelSuccess: true,
                errorCancel: null,
            }
        case 'CANCEL_ORDER_FAIL':
            return {

                errorCancel: action.payload,
                cancelLoading: false,
            }
        default: 
            return state
    }
}