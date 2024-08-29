import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>About Us Page</h2>
      <p>
        Hello,my name is Yeva.I am the creator of this website.On this site,I
        implemented theme color switching and data retrieval from an API server.
      </p>
      <Button type="primary" onClick={handleButtonClick}>
        Home page
      </Button>
    </div>
  );
};

export default AboutUs;
