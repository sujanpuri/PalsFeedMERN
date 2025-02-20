import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Components/navBar";

const Page = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchedUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user", {
          withCredentials: true,
        });

        const data = await response.data;

        if (data.status) {
          setName(data.name);
        } else {
          alert("Session expired, Please log in again.");
          window.location.href = "/";
        }
      } catch (error) {
        alert("Error while fetching User Data");
        console.log("Error: ", error);
      }
    };

    fetchedUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.delete("http://localhost:8080/logout", {
        withCredentials: true,
      });
      const data = response.status;
      if (data) {
        console.log("Log Out Successfull.");
        window.location.href = "/";
      } else {
        alert("There is error while logging Out.");
      }
    } catch (error) {
      alert("DB connection error, Can't Log Out.");
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      {/* Calling the component by sending the name as props */}
      <NavBar userName={name} />
      <div>Here you will see the Posts.</div>
      <button onClick={handleLogout} className=" mt-2 px-2 py-1 bg-blue-200 hover:bg-blue-400 border-2 rounded-md">Log Out</button>
    </div>
  );
};

export default Page;
