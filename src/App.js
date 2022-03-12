import React, { useCallback, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useFetch from "./hooks/useFetch";

//30646926
function App() {
  const [listing, setListing] = useState("newstories");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error } = useFetch(listing, currentPage);

  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  console.log(data, loading, error);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React etret
        </a>
      </header>
      <button onClick={() => setListing("topstories")}>change</button>
    </div>
  );
}

export default App;
