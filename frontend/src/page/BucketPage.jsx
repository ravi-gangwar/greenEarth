import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { addAction, deleteFromCart } from '../actions/bucketAction';
import '../style/bucketPage.css'
// import {loadStripe} from '@stripe/stripe-js';
import { useState } from 'react';

//Actions
import { placeOrderAction } from '../actions/orderAction';


function BucketPage() {
  const bucketState = useSelector((state) => state.bucketReducer);
  const bucketItems = bucketState.bucketItems;
  const dispatch = useDispatch();
  const total = bucketItems.reduce((x, item) => x + item.price*item.quantity, 0)
  const userState = useSelector(state => state.loginUserReducer);
  const {currentUser} = userState;


// address 
const [name, setName] = useState(currentUser ? currentUser.data.name : "");
const [email, setEmail] = useState(currentUser ? currentUser.data.email : "");
const [phone, setPhone] = useState("");
const [state, setState] = useState("");
const [city, setCity] = useState("");
const [pincode, setPincode] = useState("");
const [address, setAddress] = useState("");
const [landmark, setLandmark] = useState("");


//verify input fields
const addressHandler = ()=>{
  if(!currentUser) {
    return window.location.href = '/login';
  }
  if(bucketItems.length === 0){
    alert("Please add trees to bucket")
    return;
  }
  if(name && email && phone && state && city && pincode && address && landmark){
    makePayment();
  }else{
    alert("Please fill all the fields")
  }

}


// payment
const makePayment = async () => {
  const reqBody = {
    bucketItems: bucketItems,
    address: {
      userId: currentUser.data._id,
      name: name,
      email: email,
      phone: phone,
      amount: total,
      state: state,
      city: city,
      pincode: pincode,
      address: address,
      landmark: landmark,
    }
    
  };
  dispatch(placeOrderAction(reqBody))
}


  return (
    <div className='bucket-main'>
      <div className='bucketPage'>
        {bucketItems.length === 0 ? (<h1>Bucket is Empty.</h1>) : ("")}
        {bucketItems.map((tree, index) => (
          <div className='bucketItemContainer' key={index}>
            <img className='bucketItemImg' src={tree.imageUrl} alt="notFound" />
              <h1>{tree.name}</h1>
              <h4>Price: &#x20B9;{tree.quantity*tree.price}</h4>
            <div className='inc-dec-btn'>
              <FaPlusCircle className='incdec-btn'
                onClick={() => {
                  if (tree.quantity < 10) {
                    dispatch(addAction(tree, tree.quantity + 1));
                  }
                }}
              />
              <div className='quantity-trees'>{tree.quantity}</div>
              <FaMinusCircle className='incdec-btn'
                onClick={() => {
                  if (tree.quantity > 1) {
                    dispatch(addAction(tree, tree.quantity - 1));
                  }
                }}
              />
            </div>
            <button className='deleteItem' onClick={()=> {
              dispatch(deleteFromCart(tree))
            }}>Delete</button>
          </div>
        ))}
      </div>
      
      <div className='address-div'>

        <h1>ADDRESS DETAILS</h1>
        <input className="inp" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
        <input className="inp" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
        <input className="inp" type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter Phone'/>
        <input className="inp" type="text" value={state} onChange={(e)=>setState(e.target.value)} placeholder='Enter State'/>
        <input className="inp" type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder='Enter City'/>
        <input className="inp" type="text" value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder='Enter Pincode'/>
        <input className="inp" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Enter Address'/>
        <input className="inp" type="text" value={landmark} onChange={(e)=>setLandmark(e.target.value)} placeholder='Enter Landmark'/>
        <div className='totalPriceDiv'> 
          <h3>Total Amount: &#x20B9;{total}/-</h3>
          <button className='pay-btn' onClick={addressHandler}>Pay Now</button>
        </div>
        
      </div>
      
    </div>
  );
}

export default BucketPage;
