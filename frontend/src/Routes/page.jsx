import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Components/navBar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/Dialog";
import PostForm from "../Components/postForm";
import PostList from "../Components/postList";

const Page = ({userId}) => {
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

  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          setVisible(false);
          handleLogout();
        }}
        className="bg-red-100"
      />
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        autoFocus
        className="p-button-text bg-green-100"
      />
    </div>
  );

  return (
    <div>
      {/* Calling the component by sending the name as props */}
      <NavBar userName={name} />
      <div>Here you will see the Posts.</div>
      <div className="p-4">
        <PostForm userId={userId} />
        <PostList />
      </div>

      <Button
        label="Log Out"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
        className=" mt-2 px-2 py-1 bg-blue-200 hover:bg-blue-400 border-2 rounded-md"
      />
      <Dialog
        header="Log Out"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <p className="m-0">Are you sure wanna Log Out??</p>
      </Dialog>
    </div>
  );
};

export default Page;
