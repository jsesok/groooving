import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [songTitle, setSongTitle] = useState("");

  const handleClick = () => {
    onSubmit(songTitle);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(songTitle);
  };

  const handleChange = (e) => {
    setSongTitle(e.target.value);
  };

  return (
    <div>
      {/* search triggered by an Enter key */}
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-control form-control-lg shadow-none"
          value={songTitle}
          placeholder="Enter a song title"
          onChange={handleChange}
        />
      </form>
      {/* search triggered by a button click */}
      <div className="p-4 mt-4 d-flex justify-content-center align-items-center">
        <button 
          className="btn btn-primary rounded-pill" 
          onClick={handleClick}
          disabled={songTitle === ""}
          >
            SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
