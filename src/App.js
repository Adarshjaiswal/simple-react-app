import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";

function App() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://reqres.in/api/users?page=1");
      if (response.ok) {
        const data = await response.json();
        setUserData(data.data); // Assuming data is an array of user objects
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid shadow">
      <header className="d-flex flex-wrap justify-content-center align-items-center py-3">
        <a
          href="/"
          className="d-flex align-items-center mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <img src={logo} className="logo" alt="logo" />
          <span className="fs-4 text-black">logo</span>
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page" onClick={getUsers}>
              Get Users
            </a>
          </li>
        </ul>
      </header>

      {isLoading ? (
        <div className="d-flex justify-content-center min-vh-100">
          <PuffLoader color="blue" />
        </div>
      ) : (
        <div className="container">
          <h2>Fetched User Data</h2>
          <div className="row">
            {userData.map((user) => (
              <div key={user.id} className="col-md-4">
                <div className="card mb-3">
                  <img src={user.avatar} className="card-img-top" alt={`Avatar of ${user.first_name}`} />
                  <div className="card-body">
                    <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
                    <p className="card-text">{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
