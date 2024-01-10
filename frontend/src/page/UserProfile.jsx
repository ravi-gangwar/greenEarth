import "../style/profileUser.css";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../actions/userAction";


function UserProfile() {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch();
  const [profileEdit, setProfileEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({
    _id: currentUser.data._id,
    avatar: null,
    name: currentUser.data.name,
    email : currentUser.data.email,
    dob: "",
    address: {
      city: "" || "Set the City",
      state: "" || "Set the state",
      pincode: ""|| "Set the pincode",
      landmark: ""|| "Set the landmark"
    },
    phone: +910000000000,
  });
  console.log(userInfo.dob)

  const updatedUser = {
    avatar: userInfo.avatar,
    name: userInfo.name,
    email: userInfo.email,
    dob : userInfo.dob,
    address: userInfo.address,
    phone : userInfo.phone,
    _id: userInfo._id
}
  
  function handleProfile() {
    const formData = new FormData();
    formData.append('userProfile', userInfo.avatar);
    dispatch(updateUserAction({updatedUser, formData}));    
  }

  return (
    <div className="profile-page">
      <div className="profile-div">
        <div className="user-profile-div">
          {profileEdit ? (
            <input
            type="file" name="userProfile"
            onChange={(e) => setUserInfo({ ...userInfo, avatar: e.target.files[0] })}
            />

          ) : (
            <img
              src={
                currentUser.data.avatar ||
                "https://i.pinimg.com/564x/e8/7a/b0/e87ab0a15b2b65662020e614f7e05ef1.jpg"
              }
              alt="user image"
            />
          )}
        </div>
        <div className="user-profile-details">
          <span className="profile-spans">
            Name:
            {profileEdit ? (
              <input
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                name="userProfile"
              />
            ) : (
              <h3>{userInfo.name}</h3>
            )}
          </span>
          <span className="profile-spans">
            Role:<h3>{currentUser.data.isAdmin ? "Admin" : currentUser.data.isWorker ? "Employee" : "User"}</h3>
          </span>
          <span className="profile-spans">
            Membership:<h3>{currentUser.data.isMember ? currentUser.data.isMembership : "No"}</h3>
          </span>
          <span className="profile-spans">
            Date of Birth:
            {profileEdit ? (
              <input value={userInfo.dob} type="date" onChange={(e) => setUserInfo({ ...userInfo, dob: e.target.value })} />
            ) : (
              <h3>{}</h3>
            )}
          </span>
          <span className="profile-spans">Email: {profileEdit ? <input  value={userInfo.email} onChange={(e)=> setUserInfo({...userInfo, email : e.target.value})}/> : <h3>{currentUser.data.email}</h3>} </span>
          <span className="profile-spans">
            Phone:
            {profileEdit ? (
              <input value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
            ) : (
              <h3>{userInfo.phone}</h3>
            )}
          </span>
          <span className="profile-spans">
            Address:
            {profileEdit ? (
              <input value={userInfo.address} onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} />
            ) : (
              <h4>{}</h4>
            )}
          </span>
        </div>
        {profileEdit ? (
          <button className="edit-btn" onClick={() => {handleProfile(); setProfileEdit(!profileEdit)}}>
            <FaCheck />
          </button>
        ) : (
          <button className="edit-btn" onClick={() => { setProfileEdit(!profileEdit)}}>
            <FaEdit />
          </button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
