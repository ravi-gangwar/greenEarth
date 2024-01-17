// React component in JSX with inline CSS styles

import { useEffect, useState } from 'react';
import "../style/planttree.css"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTreeById } from '../actions/treeAction';
import { placeOrderAction } from '../actions/orderAction';
import Loader from './Loader';

const PlantTree = () => {
    const treeId = useParams();
    const userState = useSelector(state => state.loginUserReducer);
    const {currentUser} = userState;


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTreeById(treeId));
    }, [treeId, dispatch])


    const getTreeByState = useSelector((state) => state.getTreeByIdReducer);
    const { tree, loading, error } = getTreeByState;

  const [formData, setFormData] = useState({
    name: currentUser.data.name,
    email: currentUser.data.email,
    phoneNumber: '',
    state: '',
    city: '',
    pincode: '',
    address: '',
    landmark: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentUser.data.isAdmin){
      alert("You are not allowed to place order")
    }else if(formData.name === "" || formData.email === "" || formData.phoneNumber === "" || formData.state === "" || formData.city === "" || formData.pincode === "" || formData.address === "" || formData.landmark === ""){
      alert("Please fill all the fields")
    }else{
        makePayment();
    }

  };
  const bucketItems = [tree]

  const makePayment = async () => {
    const reqBody = {
      bucketItems: bucketItems,
      address: {
        userId: currentUser.data._id,
        name: currentUser.data.name,
        email: currentUser.data.email,
        phone: formData.phoneNumber,
        amount: tree.price,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        address: formData.address,
        landmark: formData.landmark,
      }
      
    };
    dispatch(placeOrderAction(reqBody))
  }

  return (
    <div className='plant-page-main'>{
        loading ? (<Loader/>) : error ? (<h2>{error}</h2>) : (
      <>
      <div className='plant-tree-details'>
        <img src={tree?.imageUrl} alt="" />
        <h3>{tree?.name}</h3>
        <p>Price: &#x20B9;{tree?.price}</p>
      </div>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="landmark">Landmark:</label>
          <input type="text" id="landmark" name="landmark" value={formData.landmark} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <button type="submit">Order</button>
        </div>
      </form>
    </div>
      </>)
    }
    </div>
  );
};

export default PlantTree;
