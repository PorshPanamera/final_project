import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Contacts Page</h2>
      <h2>My contacts:</h2>
      <p>My phone number: +380500730048 </p>
      <p>My emeil: evaivaniseva0@gmail.com</p>
      <p>My inst: @eviehxh</p>
      <Button type="primary" onClick={handleButtonClick}>
        Home page
      </Button>
    </div>
  );
};

export default Contacts;
