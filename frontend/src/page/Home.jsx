import { useEffect, useState } from 'react';
import "../style/home.css"
import SearchBar from '../components/SearchBar';
import SearchList from '../components/homePage/SearchList';
import ListAllTress from '../components/homePage/ListAllTrees';
import { useSelector } from 'react-redux';
import OutdoorTrees from "../components/homePage/OutdoorTress.jsx";
import IndoorTrees from "../components/homePage/IndoorTrees.jsx";


function Home() {
  const userState = useSelector(state => state.loginUserReducer);
  // const { currentUser } = userState;
  const [searchTerm, setSearchTerm] = useState('');
  const [indoor, setIndoor] = useState(false);
  const [outdoor, setOutdoor] = useState(false);



  // useEffect(() => {
  //   if (!currentUser) {
  //     window.location.href = '/login';
  //   }
  // }, [currentUser, outdoor, indoor]);

  return (
    <div className='home'>
      <>
        <div className='search-div'>
          <SearchBar updateSearchTerm={setSearchTerm} />
          <div className='cetageory'>
            <button className={indoor === false && outdoor === false ? "btn-cate1" : "btn-cate2"} onClick={() => { setIndoor(false); setOutdoor(false) }}>All Trees</button>
            <button className={indoor ? "btn-cate1" : "btn-cate2"} onClick={() => { setOutdoor(false); setIndoor(true) }}>Indoor Trees</button>
            <button className={outdoor ? "btn-cate1" : "btn-cate2"} onClick={() => { setIndoor(false); setOutdoor(true) }}>Outdoor Trees</button>
          </div>
        </div>
        <div className='card-div'>
          {searchTerm.length > 0 ? (
            <SearchList searchTerm={searchTerm} />
          ) : indoor === true ? (
            <IndoorTrees />
          ) : outdoor === true ? (
            <OutdoorTrees />
          ) : (
            <ListAllTress />
          )}
        </div>
      </>
    </div>
  );
}

export default Home;
