import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const [getdata, setgetData] = useState([]);

  const getInput = async (e) => {
    const res = await fetch("https://eployeeregister.herokuapp.com/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data.id);

    if (res.status === 400 || res.status === 404 || !data) {
      console.log("error");
    } else {
      setgetData(data);
      // console.log(data.id, "get data is here");
    }
  };

  useEffect(() => {
    getInput();
  }, []);

  return (
    <div>
      <nav class=" navbar navbar-expand-lg bg-light">
        <div class="container-fluid px-5  ">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "Black" : "Blue",
              // background: isActive ? "#7600dc" : "#f0f0f0",
            })}
          >
            <p class="navbar-brand  ">Home</p>
          </NavLink>
          <NavLink
            to="/chart"
            style={({ isActive }) => ({
              color: isActive ? "Black" : "Blue",
              // background: isActive ? "#7600dc" : "#f0f0f0",
            })}
          >
            <p class="navbar-brand  ">Chart </p>
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"></li>
            </ul>
            {/* <form class="d-flex" role="search">
              <input
                onChange={handlesearch}
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>

            <button class="btn btn-outline-success" type="submit">
              Search
            </button> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
