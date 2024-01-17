export const searchTreeReducer = (state = { searchTrees: [] }, action) => {
    switch (action.type) {
      case 'SEARCH_TREE_REQUEST':
        return { ...state, searchLoading: true };
  
      case 'SEARCH_TREE_SUCCESS':
        return {
            ...state,
          searchTrees: action.payload,
          searchLoading: false,
        };
  
      case 'SEARCH_TREE_FAIL':
        return {
            searchError: action.payload,
            searchLoading: false,
        };
  
      default:
        return state;
    }
  };