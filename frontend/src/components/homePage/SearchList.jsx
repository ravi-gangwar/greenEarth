import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Treecard from '../Treecard'
import "../../style/home.css"

import { searchTreeAction } from '../../actions/searchTreeAction';
import Loader from '../Loader';

function SearchList({searchTerm}) {
  const dispatch = useDispatch();
  const searchTreeState = useSelector((state)=> state.searchTreeReducer)
  const {searchTrees, searchLoading, searchError} = searchTreeState;

  // search function 

  function searchTree(searchTerm){
    dispatch(searchTreeAction(searchTerm))
  }
  useEffect(() => {
    if(searchTerm != ''){
      setTimeout(() => searchTree(searchTerm), 1000);
    }
  }, [searchTerm]);

  return (
    <div className='home'>
      {searchLoading === false && searchTrees.length == 0 ? (<h1 className='tree-not-found'>This Tree not available</h1>): searchLoading ? (
        <Loader/>
      ) : searchError ? (
        <h1 className='error'>Server Error or data not fetched</h1>
      ) : (
        <>
          <div className='card-div'>
            {searchTrees.map((tree) => (
              <Treecard key={tree.id} tree={tree} />
            )) }
          </div>
        </>
      )}
    </div>
  );
}

export default SearchList;
