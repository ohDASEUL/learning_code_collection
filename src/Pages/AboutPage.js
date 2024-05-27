import React from "react";
import {useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate()
  const goToHome=()=>{
    navigate('/')
  }
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={goToHome}>Go to Homepage</button>
    </div>
  );
};

export default AboutPage;
