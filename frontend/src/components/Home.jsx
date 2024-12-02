import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "#FACE1D" }}>
      <h1>Select a Form</h1>
      <div>
        <button onClick={() => navigate("/form-a")} style={styles.button}>
          Form A
        </button>
        <button onClick={() => navigate("/form-b")} style={styles.button}>
          Form B
        </button>
        <button onClick={() => navigate("/test")} style={styles.button}>
          test
        </button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#FACE1D",
    color: "#3F0986",
  },
};

export default Home;
