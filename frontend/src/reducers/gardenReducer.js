export const gardenReducer = (state = {gadernTrees : []}, action) => {
    switch (action.type) {
      case 'GADERN_TREE_BY_ID_TREE_REQUEST':
        return { 
          ...state, 
          loading: true, 
          error: null };
  
      case 'GADERN_TREE_BY_ID_TREE_SUCCESS':
        return {
            gadernTrees: action.payload,
            loading: false,
            error: null,
        };
      case 'GADERN_TREE_BY_ID_TREE_FAIL':
        return {
            error: action.payload,
            loading: false,
            gadernTrees: []
        };
      default:
        return state;
    }
  }