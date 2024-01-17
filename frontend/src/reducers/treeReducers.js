export const treeReducer = (state = { trees: {} }, action) => {
    switch (action.type) {
      case 'GET_TREE_REQUEST':
        return { ...state, loading: true };
  
      case 'GET_TREE_SUCCESS':
        return {
          trees: action.payload,
          loading: false,
        };
  
      case 'GET_TREE_FAIL':
        return {
          error: action.payload,
          loading: false,
        };
  
      default:
        return state;
    }
  };
export const getTreeWithTypeReducer = (state = { tree: [] }, action) => {
    switch (action.type) {
      case 'GET_TYPE_TREE_REQUEST':
        return { ...state, loading: true };
  
      case 'GET_TYPE_TREE_SUCCESS':
        return {
          tree: action.payload,
          loading: false,
        };
  
      case 'GET_TYPE_TREE_FAIL':
        return {
          error: action.payload,
          loading: false,
        };
  
      default:
        return state;
    }
  };
  export const AddTreeReducer = (state = { loading: false, success: false, error: null }, action) => {
    switch (action.type) {
      case 'ADD_TREE_REQUEST':
        return { ...state, loading: true, success: false, error: null };
  
      case 'ADD_TREE_SUCCESS':
        return {
          ...state,
          success: true,
          loading: false,
          error: null,
        };
  
      case 'ADD_TREE_FAIL':
        return {
          ...state,
          error: action.payload,
          loading: false,
          success: false,
        };
  
      // Optionally, handle a 'RESET' action to reset the state to its initial values
      case 'RESET_ADD_TREE_STATE':
        return { loading: false, success: false, error: null };
  
      default:
        return state;
    }
  };
  
  export const getTreeByIdReducer = (state = { }, action) => {
    switch (action.type) {
      case 'GET_TREE_BY_ID_TREE_REQUEST':
        return { 
          ...state, 
          loading: true, 
          error: null };
  
      case 'GET_TREE_BY_ID_TREE_SUCCESS':
        return {
          tree: action.payload,
          loading: false,
          error: null,
        };
  
      case 'GET_TREE_BY_ID_TREE_FAIL':
        return {
          error: action.payload,
          loading: false,
        };
      // Optionally, handle a 'RESET' action to reset the state to its initial values
      case 'RESET_GET_TREE_BY_ID_TREE_STATE':
        return { loading: false,tree: action.payload ,error: null };
      default:
        return state;
    }
  };
  export const updateTreeByIdReducer = (state = { }, action) => {
    switch (action.type) {
      case 'UPDATE_TREE_BY_ID_TREE_REQUEST':
        return { 
          ...state, 
          updateLoading: true, 
          updateError: null };
  
      case 'UPDATE_TREE_BY_ID_TREE_SUCCESS':
        return {
          updateSuccess: true,
          updateLoading: false,
          updateError: null,
        };
  
      case 'UPDATE_TREE_BY_ID_TREE_FAIL':
        return {
          updateError: action.payload,
          updateLoading: false,
        };
      // Optionally, handle a 'RESET' action to reset the state to its initial values
      case 'RESET_UPDATE_TREE_BY_ID_TREE_STATE':
        return { loading: false,tree: action.payload ,error: null };
      default:
        return state;
    }
  };


export const deleteTreeByIdReducer = (state = { }, action) => {
    switch (action.type) {
      case 'DELETE_TREE_BY_ID_TREE_REQUEST':
        return { 
          ...state, 
          deleteLoading: true, 
          deleteError: null };
  
      case 'DELETE_TREE_BY_ID_TREE_SUCCESS':
        return {
          deleteSuccess: true,
          deleteLoading: false,
          deleteError: null,
        };
      case 'DELETE_TREE_BY_ID_TREE_FAIL':
        return {
          deleteError: action.payload,
          deleteLoading: false,
        };
      // Optionally, handle a 'RESET' action to reset the state to its initial values
      case 'RESET_DELETE_TREE_BY_ID_TREE_STATE':
        return { loading: false,tree: action.payload ,error: null };
      default:
        return state;
    }
  }