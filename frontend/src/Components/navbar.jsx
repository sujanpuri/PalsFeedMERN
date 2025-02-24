import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ userName, userId }) => {
  const name = userName;
  console.log(userId);
  return (
    <div className="flex flex-row w-full h-10 items-center justify-between bg-blue-200 p-2">
      <div className="font-bold text-2xl">PalsFeed</div>
      <div>NavBar here</div>
      <Link to="/profile">
        <div className="font-semibold">
          {name ? name : "Name Props sent failed..."}
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
