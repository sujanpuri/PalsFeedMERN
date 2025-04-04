import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Components/userContext.jsx"; // Importing user context
import { Button } from "primereact/button";
import { Dialog } from "primereact/Dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user } = useUser(); // Get user from context
  const [visible, setVisible] = useState(false);
  const [logVisible, setLogVisible] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => {
    setVisible(!visible);
  };

  const footerContent = (
    <div className="flex flex-row gap-3 pl-1">
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          setLogVisible(false);
          handleLogout();
        }}
        className="bg-red-100 px-2 py-1 rounded-md border border-black"
      />
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setLogVisible(false)}
        autoFocus
        className="bg-green-100 not-visited:px-2 py-1 rounded-md border border-black"
      />
    </div>
  );

  const handleLogout = async () => {
    try {
      const response = await axios.delete("http://localhost:8080/logout", {
        withCredentials: true,
      });
      const data = response.status;
      console.log(data);
      if (data) {
        console.log("Log Out Successfull.");
        navigate("/");
      } else {
        alert("There is error while logging Out.");
      }
    } catch (error) {
      alert("DB connection error, Can't Log Out.");
    }
  };

  return (
    <div className="flex flex-row w-full h-10 items-center justify-between bg-blue-200 p-2">
      <div className="font-bold text-2xl">PalsFeed</div>
      <div className="flex ">
        <Link to="/profile">
          <div className="font-semibold">
            {user === undefined ? "Loading..." : user || "Guest"}
          </div>
        </Link>
        <button className="mx-2" onClick={handleMenu}>
          {visible ? "close" : "Menu"}
        </button>
        {visible && (
          <div className="absolute bg-white shadow-lg rounded-md p-4 mt-10 right-[27%] w-48">
            {/* Log Out */}
            <div className="w flex justify-center items-center">
              <Button
                label="Log Out"
                icon="pi pi-external-link"
                onClick={() => setLogVisible(true)}
                className=" mt-2 px-2 py-1 bg-red-200 hover:bg-red-400 border-2 rounded-md"
              />
              <Dialog
                className="p-2 bg-gray-100 border-2 border-blue-950 rounded-xl"
                visible={logVisible}
                style={{ width: "30vw" }}
                onHide={() => {
                  if (!logVisible) return;
                  setLogVisible(false);
                }}
                footer={footerContent}
              >
                <h1 className="text-xl font-bold">Log Out?</h1>
                <p className="m-2">Are you sure wanna Log Out??</p>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
