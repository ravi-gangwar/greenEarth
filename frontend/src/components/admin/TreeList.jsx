import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTree } from '../../actions/treeAction';
import "../../style/adminCSS/treesList.css"
import { deleteTree } from "../../actions/treeAction";
import Loader from '../Loader';
function TreeList() {
  const dispatch = useDispatch();
  const treestate = useSelector(state => state.treeReducer);
  const { trees, loading, error } = treestate;
  const {totalDocuments, treeList} = trees;
  const deleteTreeState = useSelector((state) => state.deleteTreeByIdReducer);
  const {/*deleteError,*/ deleteLoading, deleteSuccess} = deleteTreeState;

  const [page, setPage] = useState(1);
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page * 15 > totalDocuments) {
      alert("No more data to show");
    } else {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    dispatch(getAllTree(page));
  }, [page]);

  const handleDeleteTree = (deleteTreeId)=>{
    dispatch(deleteTree(deleteTreeId));
    if(deleteSuccess){
      alert("Tree Deleted Successfully");
    }
  }

  return (

    <>

    {
      loading ? <Loader/> : 
      <table className="tree-table">
        <thead>
          <tr className='heads'>
            <th>S/N</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th className='actionHead'>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="error-row">
                {error}
              </td>
            </tr>
          ) : (
            treeList &&
            treeList.map((tree, index) => (
              <tr key={tree._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{index + 1}</td>
                <td><a href={tree.imageUrl} target='_blanck'>Image</a></td>
                <td>{tree.name}</td>
                <td>{tree.price}</td>
                <td>{tree.description}</td>
                <td>{tree.category}</td>
                <td>
                <Link className='editTree-btn-admin' to={`/admin/edit-tree/${tree._id}`}><button>Edit</button></Link>
                <button className="delete-btn" onClick={() => handleDeleteTree(tree._id)}>{deleteLoading ? "Deleting..." : "Delete"}</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table> 
    }
        <div className='loadmoreBtns'>
        <button className='prevNext' onClick={handlePrev}>
          Prev
        </button>
        <button className={page * 15 > totalDocuments ? "preNextDanger" : "prevNext"} onClick={handleNext}>
          {page * 15 > totalDocuments ? "No more data to show" : "Next"}
        </button>
      </div>
    </>
  );
}

export default TreeList;
