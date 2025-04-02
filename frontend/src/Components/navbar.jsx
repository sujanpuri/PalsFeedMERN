import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Components/userContext.jsx"; // Importing user context

const NavBar = () => {
  const { user } = useUser(); // Get user from context

  return (
    <div className="flex flex-row w-full h-10 items-center justify-between bg-blue-200 p-2">
      <div className="font-bold text-2xl">PalsFeed</div>
      <Link to="/profile">
        <div className="font-semibold">
          {user === undefined ? "Loading..." : user || "Guest"}
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
