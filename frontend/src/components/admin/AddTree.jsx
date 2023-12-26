import { useState } from 'react';
import "../../style/adminCSS/addTrees.css"
import { addTree } from '../../actions/treeAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllTree } from '../../actions/treeAction';


const AddTree = () => {
  const dispatch = useDispatch();


  const treestate = useSelector(state => state.treeReducer);
  const { trees } = treestate;
  const len = trees.length + 1;
  useEffect(() => {
    dispatch(getAllTree());
  }, [dispatch]);
    
  const addTreestate = useSelector((state) => state.addTreeReducer) || {};
  const { loading, error, success } = addTreestate;
  const [treeData, setTreeData] = useState({
    id: len,
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTree(treeData));
    setTreeData({
      name: '',
      price: '',
      description: '',
      category: '',
      imageUrl: ''
    });
  };

  return (
    <>{error ? <div className="error">{error}</div> : success ? <div className="success">Tree added successfully!</div> :
    <div className="add-tree-container">
      <div className='add-tree-container-2'>
        <h2>Add Tree</h2>
        <form onSubmit={handleSubmit}>
        <input className='admin-addtree-input1' type="number" name="id" value={treeData.id} readOnly onChange={handleChange} />
        <input className='admin-addtree-input1' type="text" placeholder='Tree name' name="name" value={treeData.name} onChange={handleChange} />
        <input className='admin-addtree-input1' type="url" placeholder="Image-url" name="imageUrl" value={treeData.imageUrl} onChange={handleChange} />
        <input className='admin-addtree-input1' type="text" placeholder='Price' name="price" value={treeData.price} onChange={handleChange} />
        <input className='admin-addtree-input1' type="text" placeholder='Category' name="category" value={treeData.category} onChange={handleChange} />
        <textarea className='admin-textarea1' name="description" placeholder='Description' value={treeData.description} onChange={handleChange} />
        <button className='admin-submit-btn' type="submit">{loading ? 'Loading...' : 'Add Tree'}</button>
        </form>
      </div>
    </div>}
    </>
  );
};

export default AddTree;
