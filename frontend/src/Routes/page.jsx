import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const handleLogout = async ()=>{
    try {
      const response = await axios.delete("http://localhost:8080/logout", {
        withCredentials:true,
      });
      const data = response.status
      if(data){
        console.log("Log Out Successfull.");
        window.location.href="/"
      }else{
        alert("There is error while logging Out.")
      }
    } catch (error) {
      alert("DB connection error, Can't Log Out.")
      console.log("Error: ", error)
    }
  }

  return <div>This is Page. {name ? name : "Loading..."} <button onClick={handleLogout}>Log Out</button></div>;
};

export default Page;
