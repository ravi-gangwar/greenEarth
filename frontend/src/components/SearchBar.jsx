import '../style/searchbar.css';
function SearchBar({updateSearchTerm}) {

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search..."
        className="input"
        onChange={(e)=> updateSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
