import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jambotron">
    <h1>This is Administration Heading</h1>
    <p>React, Redux and React ROuter fro ultra-responsive web apps.</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn More
    </Link>
  </div>
);

export default HomePage;
