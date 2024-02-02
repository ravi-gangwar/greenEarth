import './App.css'
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import About from './page/About.jsx'
import Contact from './page/Contact'
import Home from './page/Home'
import BucketPage from './page/BucketPage'
import NotFound from './page/NotFound'
import Login from './page/Login'
import PayCancel from './components/PayCancel'
import PaySuccess from './components/PaySuccess'
import OrdersList from './page/OrdersList'
import TreeDetails from './page/treeDetails';
import UserProfile from './page/UserProfile';
import GetMembership from './page/GetMembership';
import PlantTree from './components/PlantTree.jsx';



import AdminScreen from './page/AdminScreen'
import UserMessages from './components/admin/UserMessages';
import AdminOrders from './components/admin/AdminOrders';
import UserList from './components/admin/UserList';
import TreeList from './components/admin/TreeList';
import AddTree from './components/admin/AddTree';
import EditTree from './components/admin/EditTree';
import Garden from './page/Garden';
import Footer from './components/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import TreeGrowth from './page/TreeGrowth.jsx';

function App() {
  const userState = useSelector(state => state.loginUserReducer);
  const {currentUser} = userState;
  const isAdmin = currentUser?.data?.isAdmin === true;

  
  async function getLocation() {
    const userId = currentUser?.data?._id;
    const name = currentUser?.data?.name;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async(position) => {
          const { latitude, longitude } = position.coords;
          await axios.post(`${import.meta.env.VITE_BACKED_DOMAIN}/api/auth/user-location`, {userId, name,  latitude, longitude });
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  useEffect(()=> {
    if(currentUser){
      getLocation();
    }

  }, [])



  return (
    <>{
      (
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/> 
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/bucket' element={<BucketPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/success' element={<PaySuccess/>}/>
            <Route path='/cancel' element={<PayCancel/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path='/treeDetails/:treeId' element={<TreeDetails/>}/>
            { currentUser ? 
              <>
                <Route path='/orders' element={<OrdersList/>}/>
                <Route path='/garden/:userId' element={<Garden/>}/>
                <Route path='/profile' element={<UserProfile/>}/>
                <Route path='/get-membership' element={<GetMembership/>}/>
                <Route path='/plant-tree/:treeId' element={<PlantTree/>}/>
                <Route path='/tree-growth-track/:treeId' element={<TreeGrowth/>}/>
              </> : ""
            }
    
            {isAdmin ? 
            <>
            <Route path='/admin/users' element={<UserList/>}/>
            <Route path='/admin' element={<AdminScreen/>}/>
            <Route path='/admin/trees' element={<TreeList/>}/>
            <Route path='/admin/add-tree' element={<AddTree/>}/>
            <Route path='/admin/orders' element={<AdminOrders/>}/>
            <Route path='/admin/edit-tree/:treeId' element={<EditTree/>}/>
            <Route path='/admin/user-messages' element={<UserMessages/>}/>
            </> : ""}
          </Routes>
            <Footer/>
        </BrowserRouter>

      )


      }
  </>
  )
}

export default App
