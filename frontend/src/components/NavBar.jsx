import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBucket } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import '../style/navBar.css';
import { logoutAction } from '../actions/userAction';
import { useDispatch } from 'react-redux';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function NavBar() {
  const bucketState = useSelector((state) => state.bucketReducer);
  const userState = useSelector(state => state.loginUserReducer);
  const {currentUser} = userState;
  const isAdmin = currentUser && currentUser.data.isAdmin;
  const dispatch = useDispatch();

  const [sideBar, setSideBar] = useState(false);
  const handleSidebar = () => { 
      setSideBar(!sideBar);
  }


  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setIsSticky(scrollY > window.innerHeight * 0.10);
    };

    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
  <>
    <nav id="navBarId" className={isSticky ? 'sticky' : ''}>
      <div id="logoId" className="logo">
        <Link className="link-div" to="/">
          <img src="https://github.com/ravi-gangwar/greenEarth/blob/main/frontend/src/assets/green-earth.png?raw=true" alt="" />
        </Link>
      </div>
      <ul >
        <Link className="link-div" to="/">
          <li>Home</li>
        </Link>
        <Link className="link-div" to={currentUser ? `/garden/${currentUser.data._id}` : "/login"}>
          <li>Garden</li>
        </Link>
        {currentUser ?
        <>
        <Link className="link-div" to="/orders"> <li>Orders</li></Link>
        </> 
         : <></>}
        {isAdmin === true ? <Link to="/admin">
          <li>Dashboard</li>
        </Link> : null}
        <Link className="link-div" to="/contact">
          <li>Contact</li>
        </Link>
        <Link className="link-div" to="/about">
          <li>About Us</li>
        </Link>
      </ul>
      <div className="navBar-btns">
        {currentUser ?
        <>
        <div className="dropdown">
          <button className="dropbtn">
          <img src={currentUser.data.avatar || "https://i.pinimg.com/564x/e8/7a/b0/e87ab0a15b2b65662020e614f7e05ef1.jpg"} className='userIcon' onMouseOver={() =>sideBar === true ? setSideBar(false) : ""} onClick={() => sideBar === true ? setSideBar(false) : ""}/>
          </button>
            <div className="dropdown-content">
            <Link className="linksTag-dropDown" to="/profile">Profile</Link>
            <Link className="linksTag-dropDown" to="/get-membership">Get Membership</Link>
            <p className="linksTag-dropDown" onClick={()=> dispatch(logoutAction())}>Logout</p>
          </div>
        </div>
        </> 
         : 
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>}
        <Link to="/bucket">
          <button className="bucket-btn" onClick={() =>sideBar === true ? setSideBar(false) : ""}>
            <FaBucket className="bucket" onClick={() =>sideBar === true ? setSideBar(false) : ""}/>
            <span>{bucketState.bucketItems.length}</span>
          </button>
        </Link>
            {sideBar ? <button className="side-baar-button" onClick={handleSidebar}><RxCross2/></button>  :<button className="side-baar-button" onClick={handleSidebar}>
          <IoMenu/>
          </button>}
      </div>
    </nav>
    <div className={sideBar ? "open-side-bar-div" : "off-side-bar-div"}>
          <div className='inner-side-bar-div'>
            <Link className="link-div" to="/">
              <p onClick={()=> setSideBar(!sideBar)}>Home</p>
            </Link>
            <Link className="link-div" to={currentUser ? `/garden/${currentUser.data._id}` : "/login"}>
              <p onClick={()=> setSideBar(!sideBar)}>Garden</p>
            </Link>
              <Link className="link-div" to={currentUser ? "/orders" : "/login"}> <p onClick={()=> setSideBar(!sideBar)}>Orders</p></Link>
              {isAdmin === true ? <Link to="/admin">
                <p onClick={()=> setSideBar(!sideBar)}>Dashboard</p>
              </Link> : null}
                <Link className="link-div" to="/contact">
                  <p onClick={()=> setSideBar(!sideBar)}>Contact</p>
                </Link>
              <Link className="link-div" to="/about">
                <p onClick={()=> setSideBar(!sideBar)}>About Us</p>
              </Link>

          </div>
      </div>
  </>
  );
}

export default NavBar;
