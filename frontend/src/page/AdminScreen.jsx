import { Link } from 'react-router-dom';
import '../style/adminScreen.css';

function AdminScreen() {
  return (
    <div className='admin-screen'>
      <div className='admin-controllers'>
        <ul>
          <li><Link to="/admin/orders" className='adminBtns'>Orders</Link></li>
          <li><Link to="/admin/users" className='adminBtns'>Users</Link></li>
          <li><Link to="/admin/user-messages" className='adminBtns'>Inbox</Link></li>
          <li><Link to="/admin/trees" className='adminBtns'>Trees</Link></li>
          <li><Link to="/admin/add-tree" className='adminBtns'>Add Trees</Link></li>

        </ul>
      </div>
      <div className='display-controllers'>
      </div>
    </div>
  );
}

export default AdminScreen;
