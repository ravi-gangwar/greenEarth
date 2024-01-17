const initialState = {
    bucketItems: [],
};

export const bucketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_BUCKET':
            const alreadyExists = state.bucketItems.find(item => item._id === action.payload._id);
            return {
                ...state,
                bucketItems: alreadyExists
                    ? state.bucketItems.map(item => item._id === action.payload._id ? action.payload : item)
                    : [...state.bucketItems, action.payload],
            };
        case 'DELETE_FROM_BUCKET':
            return {
                ...state,
                bucketItems: state.bucketItems.filter(item => item._id !== action.payload._id),
            };
        default:
            return state;
    }
};