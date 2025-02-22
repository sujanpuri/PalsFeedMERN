import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Components/navBar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/Dialog";
import PostForm from "../Components/postForm";

const Page = () => {
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([{}]);

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
    }
  };

  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div className="flex flex-row gap-3 pl-1">
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          setVisible(false);
          handleLogout();
        }}
        className="bg-red-100 px-2 py-1 rounded-md border border-black"
      />
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        autoFocus
        className="bg-green-100 not-visited:px-2 py-1 rounded-md border border-black"
      />
    </div>
  );

  // Fetching the DB data.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts/getall");
        setPosts(response.data);
      } catch (error) {
        alert("Error: ", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Calling the component by sending the name as props */}
      <NavBar userName={name} />
      <div>
        <PostForm userName={name} />
      </div>
      <div className="flex flex-col w-full border border-black">
        {posts.map((item, index) => (
          <div key={index}>
            <h3>{item.userName}</h3>
            <p>{item.caption}</p>
            <small>{new Date(item.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <Button
        label="Log Out"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
        className=" mt-2 px-2 py-1 bg-blue-200 hover:bg-blue-400 border-2 rounded-md"
      />
      <Dialog
        className="p-2 bg-gray-100 border-2 border-blue-950 rounded-xl"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <h1 className="text-xl font-bold">Log Out?</h1>
        <p className="m-2">Are you sure wanna Log Out??</p>
      </Dialog>
    </div>
  );
};

export default Page;
