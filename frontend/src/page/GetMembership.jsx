import "../style/getMembership.css"
import { useDispatch, useSelector } from "react-redux"
import { getMembershipAction } from "../actions/getMembershipAction";
import Loader from "../components/Loader";
function GetMembership() {


    const userState = useSelector((state) => state.loginUserReducer)
    const { currentUser } = userState;

    const dispatch = useDispatch();




    const _id = currentUser.data._id;
    const basic = "Basic";
    const standard = "Standard";
    const premium = "Premium";

    const {loading, /*success, error*/} = useSelector((state) => state.getMembershipReducer)


    const handleMembership = (_id, membership) => {
        dispatch(getMembershipAction(_id, membership))
    }



  return (
    <>
    { loading ? <Loader/> :
        <div className="main-new-div">
        <h1 className="member-h1">Become Member</h1>
        <div className='getMembership-page'>

        <div className='all-membership-div'>

            <table>
                <thead>
                    <tr>
                    <th>Memberships</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Benifits</th>
                    <th>Buy Now</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Basic</td>
                        <td>Rs.299\-</td>
                        <td>6 Month</td>
                        <td>Free Delivery,<br/> Unlimited Service</td>
                        <td><button onClick={() => handleMembership({_id: _id, membership: basic})}>Get Membership</button></td>
                    </tr>
                    <tr>
                        <td>Standard</td>
                        <td>Rs.499\-</td>
                        <td>1 year</td>
                        <td>Free Delivery,<br/> Unlimited Service</td>
                        <td><button onClick={() => handleMembership({_id: _id, membership: standard})}>Get Membership</button></td>
                    </tr>
                    <tr>
                        <td>Premium</td>
                        <td>Rs.999\-</td>
                        <td>2 year</td>
                        <td>Free Delivery,<br/> Unlimited Service</td>
                        <td><button onClick={() => handleMembership({_id: _id, membership: premium})}>Get Membership</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div className="slider-container">
      <div className="card">
        <span className="span-card-member"><h1>Basic</h1></span>
        <span className="span-card-member">Price: <h3>299</h3></span>
        <span className="span-card-member">Duration: <h3>6 Month</h3></span>
        <span className="span-card-member">Benefits: <h3>Free delivery, <br />Unlimited Service</h3></span>
        <span className="span-card-member"><button onClick={() => handleMembership({_id: _id, membership: basic})}>Buy Now!!</button></span>
      </div>
      <div className="card">
        <span className="span-card-member"><h1>Standard</h1></span>
        <span className="span-card-member">Price: <h3>499</h3></span>
        <span className="span-card-member">Duration: <h3>1 Year</h3></span>
        <span className="span-card-member">Benefits: <h3>Free delivery, <br />Unlimited Service</h3></span>
        <span className="span-card-member"><button onClick={() => handleMembership({_id: _id, membership: standard})}>Buy Now!!</button></span>
      </div>
      <div className="card">
        <span className="span-card-member"><h1>Premium</h1></span>
        <span className="span-card-member">Price: <h3>999</h3></span>
        <span className="span-card-member">Duration: <h3>2 Year</h3></span>
        <span className="span-card-member">Benefits: <h3>Free delivery, <br />Unlimited Service</h3></span>
        <span className="span-card-member"><button onClick={() => handleMembership({_id: _id, membership: premium})}>Buy Now!!</button></span>
      </div>

      
    </div>
    </div>
    }
    

    </>
  )
}

export default GetMembership
