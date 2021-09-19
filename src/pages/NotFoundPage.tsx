import React from "react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div>
      <img
        src="https://usercontent.one/wp/www.colorofindia.se/wp-content/uploads/2020/08/404.jpg"
        alt="Not found"
      />
      <p style={{ textAlign: "center" }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
}
