import { Link } from 'react-router-dom';
import '../style/adminScreen.css';
import { useSelector } from 'react-redux';

function AdminScreen() {
  const userState = useSelector(state => state.loginUserReducer);
  const {currentUser} = userState;
  return (
    <div className='admin-screen'>
      <div className='admin-controllers'>
        <ul>
          <li><Link to="/admin/orders" className='adminBtns'>Orders</Link></li>
          {
            currentUser.data.isWorker === false  ||  currentUser.data.isAdmin === true ?
            <>
          <li><Link to="/admin/users" className='adminBtns'>Users</Link></li>
          <li><Link to="/admin/user-messages" className='adminBtns'>Inbox</Link></li>
          <li><Link to="/admin/trees" className='adminBtns'>Trees</Link></li>
          <li><Link to="/admin/add-tree" className='adminBtns'>Add Trees</Link></li>
            </> : ""
          }

        </ul>
      </div>
      <div className='display-controllers'>
      </div>
    </div>
  );
}

export default AdminScreen;
