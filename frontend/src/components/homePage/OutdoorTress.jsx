import { useEffect } from "react";
import { getTreeWithType } from "../../actions/treeAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Treecard from "../Treecard";

function OutdoorTrees() {
    const dispatch = useDispatch();
    const treestate = useSelector(state => state.getTreeWithTypeReducer);
    const { tree, loading, error } = treestate;
    console.log(tree)
    const outdoorTreesList = tree.filter(tree => tree.category === "outdoor");
    
    useEffect(() => {
      dispatch(getTreeWithType());
    }, []);
  
    return (
      <div className='home'>
        {loading ? (
          <Loader className='loading' />
        ) : error ? (
          <h1 className='error'>Server Error or data not fetched</h1>
        ) : (
          <>
            <div className='card-div'>
              {outdoorTreesList &&
                outdoorTreesList.map((tree, index) => (
                   <Treecard key={index} tree={tree} />
                ))}
            </div>
          </>
        )}
      </div>
    );
}

export default OutdoorTrees
