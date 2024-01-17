import "../style/treeCard.css"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { addAction } from '../actions/bucketAction'


function Treecard({ tree }) {
  const dispatch = useDispatch();
  const treeId = tree._id;

  const handlePlantAction = () => {
    window.location.href = `/plant-tree/${treeId}`;
  }

  const addToBucketHandler = () => {
    dispatch(addAction(tree));
  };

  return (
    <div className='main-card'>
      <div className='box-card'>
        <div className="img-div">
          <Link to={`/treeDetails/${tree._id}`}>
            <img src={tree.imageUrl} alt="" />
          </Link>
        </div>
        <div className='cardInfo'>
          <h4>{tree.name}</h4>
          <p>Price: &#x20B9;{tree.price}</p>
        </div>
        <div className='cardBtns'>
          <button className='plantBtn' onClick={handlePlantAction}>Plant</button>
          <button onClick={addToBucketHandler} className='bucketBtn'>
            Add Bucket
          </button>
        </div>
      </div>
    </div>
  );
}

export default Treecard;

