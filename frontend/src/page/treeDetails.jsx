import { useEffect } from 'react';
import '../style/treeDetails.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTreeById } from '../actions/treeAction';
import Loader from '../components/Loader';
import { addAction } from '../actions/bucketAction';
function TreeDetails() {
    const treeId = useParams();
    const dispatch = useDispatch();
    const getTreeByState = useSelector((state) => state.getTreeByIdReducer);
    const { tree, loading, /*error*/ } = getTreeByState;

  
    useEffect(() => {
        dispatch(getTreeById(treeId));
      }, [treeId, dispatch]);


    const handlePlantButtonClick = () => {
        window.location.href = `/plant-tree/${tree._id}`;
      };
    
      const handleAddToBucketButtonClick = () => {
          dispatch(addAction(tree));
      };

  return (
    <>

    {
      loading ? <Loader/> :
    tree ? <div className="tree-details-container">
    <img src={tree.imageUrl} alt={tree.name} />
      <h1>{tree.name}</h1>
      <p>Category: {tree.category}</p>
      <p>Price: Rs.{tree.price}/-</p>
      <p>Description: {tree.description}</p>
      <button onClick={handlePlantButtonClick}>Plant</button>
      <button onClick={handleAddToBucketButtonClick}>Add to Bucket</button>
    </div> : <div>Loading...</div> }
    </>
  );
}

export default TreeDetails;
