import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "./userContext.jsx"; // Importing user context
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "/logo.jpg"; // Importing logo image
import { Menu, X } from "lucide-react";

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
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/logout`, {
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
    <div className="flex flex-row w-full h-10 items-center justify-between bg-[#82b1e5] p-2">
      <div className="flex gap-2 justify-center items-center">
        <img src={logo} alt="" className="h-7 w-10"/>
        <h1 className="font-bold text-2xl ">
          PalsFeed
        </h1>
      </div>
      <div className="flex ">
        <Link to="/profile">
          <div className="font-semibold">
            {user === undefined ? "Loading..." : user || "Guest"}
          </div>
        </Link>
        <button className="mx-2" onClick={handleMenu}>
          {visible ? <X size={24} color="black" /> : <Menu size={24} color="black" />}
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
