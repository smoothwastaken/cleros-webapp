import React from "react";

function SearchBar() {
  return (
    <input
      id="default-search"
      className="w-1/3 rounded-xl border-[1px] border-gray-700 bg-white bg-opacity-0 p-1 pl-2 text-sm text-gray-200 outline-none transition-all duration-500 hover:w-1/2 hover:bg-opacity-5 focus:w-1/2 focus:bg-opacity-5"
      placeholder="Recherche..."
    />
  );
}

export default SearchBar;
