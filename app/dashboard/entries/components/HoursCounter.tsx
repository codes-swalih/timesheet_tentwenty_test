import React, { useState } from "react";
import { Button, Typography } from "antd"; // Import Ant Design components

const { Title } = Typography;

const Counter = () => {
  const [count, setCount] = useState(0); // Initialize count state

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Title level={2}>Ant Design Counter</Title>
      <Title level={1}>{count}</Title>
      <Button
        type="primary"
        onClick={increment}
        style={{ marginRight: "10px" }}
      >
        Increment
      </Button>
      <Button danger onClick={decrement}>
        Decrement
      </Button>
    </div>
  );
};

export default Counter;
