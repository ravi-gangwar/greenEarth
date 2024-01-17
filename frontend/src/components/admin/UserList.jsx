// UserList.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userAction";

import 
{ 
  makeAdminAction, 
  removeAdminAction, 
  deleteUserAction, 
  makeWorkerAction 
} from "../../actions/userAction";

import "../../style/adminCSS/userList.css"; // Import the CSS file for styling
import Loader from "../Loader";

function UserList() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.getAllUsersReducer);
  const { loading, users } = userState;
  console.log(users);

  function handleMakeAdmin(userId){
    dispatch(makeAdminAction(userId));
  }

  function handleRemoveAdmin(userId) {
    dispatch(removeAdminAction(userId));
  }

  function handleDeleteUser (userId){
    dispatch(deleteUserAction(userId));
  }

  function handleMakeWorker(userId){
    dispatch(makeWorkerAction(userId));
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="user-list-container">
      {
        loading ? <Loader/> :
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="admin-users-action-btns">
                  <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  {
                    user.isAdmin ?
                    <button className="delete-button" onClick={() => handleRemoveAdmin(user._id)}>Remove Admin</button> :
                    <button className="delete-button-make" onClick={() => handleMakeAdmin(user._id)}>Make Admin</button>
                  }
                  {
                    user.isWorker ? 
                    <button className="delete-button" onClick={() => handleMakeWorker(user._id)}>Remove Worker</button> : 
                    <button className="delete-button-make" onClick={() => handleMakeWorker(user.id)}>Make Worker</button>
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      }
    </div>
  );
}

export default UserList;
