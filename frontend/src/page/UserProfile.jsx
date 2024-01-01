import "../style/profileUser.css"
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux"
import { useEffect } from "react"
function UserProfile() {
    const userState = useSelector(state => state.loginUserReducer);
    const {currentUser} = userState;
    console.log(currentUser)

    useEffect(()=> {

    }, [])

  return (
    <div className="profile-page">
      <div className="profile-div"> 
        <img className="profile-img" src="https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg" alt="user profile"/>
        <table>
            <tbody>
                <tr>
                    <td> <h1 className="user-name">Name:</h1></td>
                    <td> <span>{currentUser.data.name}</span></td>
                </tr>
                <tr>
                <td><h2 className="user-membership">Membership:</h2></td>
                <td><span></span></td>
                </tr>
                <tr>
                    <td><h2 className="dob">Date of Birth:</h2></td>
                    <td><span></span></td>
                </tr>
                <tr>
                    <td><h2>Email:</h2></td>
                    <td><span>{currentUser.data.email}</span></td>
                </tr>
                <tr>
                    <td><h2>Phone</h2></td>
                    <td><span></span></td>
                    
                </tr>
                <tr>
                    <td><h2>Address:</h2></td>
                    <td><span></span></td>
                </tr>
            </tbody>
        </table>
        
        <button className="edit-btn"><FaEdit/></button>        
      </div>
    </div>
  )
}

export default UserProfile