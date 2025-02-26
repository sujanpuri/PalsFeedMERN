import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Components/userContext.jsx";    //importing useContext


const NavBar = () => {
  const {user} = useUser()    //using useContext
  return (
    <div className="flex flex-row w-full h-10 items-center justify-between bg-blue-200 p-2">
      <div className="font-bold text-2xl">PalsFeed</div>
      <div>NavBar here</div>
      <Link to="/profile">
        <div className="font-semibold">
          {user ? user : "Name Error...(in useContext)"}
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
