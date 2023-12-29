import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTreeById } from "../../actions/treeAction";
import { updateTree } from "../../actions/treeAction";
import { useParams } from "react-router-dom";
import "../../style/adminCSS/editTree.css";

function EditTree() {
  const dispatch = useDispatch();
  const treeId = useParams();
  const getTreeByState = useSelector((state) => state.getTreeByIdReducer);
  const { tree, loading, /*error*/ } = getTreeByState;
  const updateTreeState = useSelector((state) => state.updateTreeByIdReducer);
  const{/*updateError,*/ updateLoading, /*updateSuccess*/} = updateTreeState;
  useEffect(() => {
    dispatch(getTreeById(treeId));
  }, [treeId, dispatch]);

  const [treeData, setTreeData] = useState({
    name: '',
    imageUrl: '',
    price: '',
    category: '',
    discription: '',
    _id: ''
  });
  
  useEffect(() => {
    if (tree) {
      setTreeData({
        name: tree.name || '',
        imageUrl: tree.imageUrl || '',
        price: tree.price || '',
        categeory: tree.categeory || '',
        discription: tree.discription || '',
        _id: tree._id || ''
      });
    }
  }, [tree]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, imageUrl, price, categeory, discription, _id } = treeData;
    if (name && imageUrl && price && categeory && discription && _id) {
      dispatch(updateTree(treeData));
    }else{
      alert("Please fill all the fields")
    }
  };

  return (
    <>
    {loading ? <h1>Loading...</h1> : null}
    <div className='edit-tree-container'>
      <h1 className=''>Edit Tree</h1>
      <form className='' onSubmit={handleSubmit}>
        <label className='admit-editTree-labels' htmlFor="name">
          Name:
          <input
          type="text"
          id="name"
          name="name"
          value={treeData.name}
          onChange={(e) => setTreeData({ ...treeData, name: e.target.value })}
          className='admin-editTree-inputs'
        />
        </label>


        <label className='admit-editTree-labels' htmlFor="imageUrl">
          Image URL:
          <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={treeData.imageUrl}
          onChange={(e) => setTreeData({ ...treeData, imageUrl: e.target.value })}
          className='admin-editTree-inputs'
        />
        </label>


        <label className='admit-editTree-labels' htmlFor="price">
          Price:
          <input
          type="text"
          id="price"
          name="price"
          onChange={(e) => setTreeData({ ...treeData, price: e.target.value })}
          value={treeData.price}
          className='admin-editTree-inputs'
        />
        </label>
  

        <label className='admit-editTree-labels' htmlFor="categeory">
        Categeory:
        <input
          type="text"
          id="category"
          name="category"
          value={treeData.categeory}
          onChange={(e) => setTreeData({ ...treeData, categeory: e.target.value })}
          className='admin-editTree-inputs'
        />
        </label>


        <label className='admit-editTree-labels' htmlFor="description">
          Description:
          <textarea
          id="description"
          name="description"
          value={treeData.discription}
          onChange={(e) => setTreeData({ ...treeData, discription: e.target.value })}
          className='admin-editTree-textarea'
        />
        </label>


        <button type="submit" className='' >
          {updateLoading ? "Updating..." : "Update"}
        </button>
        
      </form>
      <img className="admin-editTree-image" src={treeData.imageUrl} alt="Add Image" />
    </div>
    </>
  );
}

export default EditTree;
