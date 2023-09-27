import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { PuffLoader } from "react-spinners"; // Importing the loader from react-spinners

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true); // Set isLoading to true when fetching data

    try {
      const response = await fetch("https://reqres.in/api/users?page=1");
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false when data fetching is complete
    }
  };

  return (
    <div className="container-fluid shadow">
      <header className="d-flex flex-wrap justify-content-center align-items-center py-3">
        <a
          href="/"
          className="d-flex align-items-center mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <img src={logo} className="logo" alt="logo"  />
          <span className="fs-4 text-black">logo</span>
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <a
              href="#"
              className="nav-link active"
              aria-current="page"
              onClick={getUsers}
            >
              Get Users
            </a>
          </li>
        </ul>
      </header>

      {isLoading ? ( // Conditional rendering based on the isLoading state
        <div class="d-flex justify-content-center min-vh-100">
          <PuffLoader color="blue" />
        </div>
      ) : (
        userData && (
          <div className="container">
            <h2>Fetched User Data</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )
      )}
    </div>
  );
}

export default App;
