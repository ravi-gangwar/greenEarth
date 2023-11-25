import React, { useEffect } from 'react';
import Treecard from '../components/Treecard'
import "../style/home.css"
import {useDispatch, useSelector} from 'react-redux';
import { getAllTree } from '../actions/treeAction';



function Home() {
  const dispatch = useDispatch();
  const treestate = useSelector(state => state.treeReducer);
  const {trees,loading, error } = treestate;
  useEffect(()=> {dispatch(getAllTree())}, [dispatch]);

  return (
    <div className='home'>
      
    {loading ? (<h1 className='loading'>Loading...</h1>) 
      : error ? (<h1>Error while fetching.</h1>)
      :(<> <div className='search-div'>
      <input className='input-search' type="text" id="search" name="q" placeholder="Type your search"/>
      </div>
      <div className='card-div'>
      {trees.map((tree)=>(
        <Treecard key={tree.id} tree={tree}/>
      ))}
      </div> </>)
    }
    </div>
  )
}

export default Home
