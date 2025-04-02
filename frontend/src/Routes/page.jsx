import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Components/navBar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/Dialog";
import PostForm from "../Components/postForm";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/userContext";

const Page = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [logVisible, setLogVisible] = useState(false);
  const { user, userId, setuser, setUserId } = useUser();

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

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/posts/getall");
      setPosts(response.data);
      console.log("Posts fetched successfully:", response.data);
    } catch (error) {
      alert("Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/posts/${postId}/like`,
        {
          userId: userId,
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: res.data.likedBy } : post
        )
      );
    } catch (error) {
      console.log("Error liking post", error);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/posts/${postId}/comment`,
        {
          userId: userId,
          userName: user,
          text: commentText,
        }
      );

      const newComment = response.data; // Assuming the API returns the new comment

      // Update state immediately
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );

      setCommentText(""); // Clear the input field
    } catch (error) {
      console.log("Error adding comment", error);
    }
  };

  return (
    <div className="h-screen border-2 flex flex-col items-center max-w-screen">
      <div className="flex flex-col w-[50%]">
        {/* NavBar */}
        <NavBar />
      </div>

      {/* post Section */}
      <div className="border border-black h-full w-[50%] bg-white shadow-lg rounded-md p-4">
        <div className="flex flex-col w-full border h-[88vh] overflow-x-hidden overflow-y-scroll space-y-6">
            <PostForm userName={user} />
            
            {/* Log Out */}
            {/* <div className="w flex justify-center items-center">
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
            </div> */}

            {/* mapping the posts */}
            {posts.map((post) => (
              <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
                {/* Header */}
                <div className="flex border justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{post.userName}</h3>
                  <small className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </small>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 mb-3">{post.caption}</p>
                {post.imageUrl && (
                  <a href={post.imageUrl}>
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="w-full h-auto mb-3"
                    />
                  </a>
                )}

                {/* Actions */}
                <div className="flex space-x-4 mt-2">
                  <Button
                    className="px-3 py-1 rounded-lg bg-blue-200 hover:bg-blue-400 transition"
                    onClick={() => handleLike(post._id)}
                  >
                    👍 {post.likes.length} Likes
                  </Button>
                  <Button
                    className="px-3 py-1 rounded-lg bg-green-200 hover:bg-green-400 transition"
                    onClick={() => {
                      setSelectedPost(post);
                      setVisible(true);
                    }}
                  >
                    💬 {post.comments.length} Comments
                  </Button>
                </div>
              </div>
            ))}
            {/* Comment Modal */}
            {selectedPost && (
              <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                className="rounded-md p-5 w-[50vw] border border-gray-500 bg-white shadow-lg" // Background for the modal
                draggable={false} // Prevents dragging
              >
                <div className="space-y-3 bg-white p-4 w-full rounded-md shadow-md">
                  {" "}
                  <h1 className="font-bold">Comments:</h1>
                  {/* White box with shadow */}
                  {/* Show Comments */}
                  <div className="max-h-60 overflow-y-auto border-b border-gray-200 pb-3">
                    {selectedPost.comments.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        No comments yet.
                      </p>
                    ) : (
                      selectedPost.comments.map((c, idx) => (
                        <div
                          key={idx}
                          className="border-b border-gray-200 flex flex-col justify-start items-start py-2 flex items-center"
                        >
                          <strong className="text-blue-800">
                            {c.userName}
                          </strong>
                          <span className="text-gray-800">{c.text}</span>
                        </div>
                      ))
                    )}
                  </div>
                  {/* Add Comment Input */}
                  <div className="flex items-center gap-2">
                    <input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="border p-2 w-full rounded-md"
                    />
                    <Button
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      onClick={() => handleComment(selectedPost._id)}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </Dialog>
            )}
        </div>
      </div>
    </div>
  );
};

export default Page;
