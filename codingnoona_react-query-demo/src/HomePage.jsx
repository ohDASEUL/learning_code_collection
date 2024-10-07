import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">HomePage</Link>
        </li>
        <li>
          <Link to="/normalpage">Normal Fetch</Link>
        </li>
        <li>
          <Link to="/reactquery">React Query</Link>
        </li>
      </ul>
    </nav>
    <h1>Welcome to HomePage</h1>
  </div>
);

export default HomePage;
