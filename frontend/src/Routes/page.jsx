import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Components/navBar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/Dialog";
import PostForm from "../Components/postForm";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/userContext";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const { user, userId, setuser, setUserId } = useUser();
  
    const navigate = useNavigate();


  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/posts/getall");
      const data = response.data.data;
      setPosts(data);
      console.log("Posts Fetching Result:", data);
      if(data){
        console.log("Posts fetched successfully.");
      }else{
        (handleLogout())
        alert("There is error while fetching posts.");
      }
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
      console.log("New comment added:", newComment);

      setCommentText(""); // Clear the input field
      fetchPosts(); // Fetch posts again to update the comments
    } catch (error) {
      console.log("Error adding comment", error);
    }
  };

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
    <div className="h-[100vh] bg-gray-800 flex flex-col items-center max-w-screen overflow-hidden">
      <div className="flex flex-col w-[50%]">
        {/* NavBar */}
        <NavBar />
      </div>

      {/* post Section */}
      <div className="h-full w-[50%] border-t border-grey-800 bg-white shadow-lg ">
        <div className="flex flex-col w-full h-[100%] bg-gray-100 overflow-x-hidden p-4 overflow-y-scroll space-y-4 scrollbar-thin scrollbar-gray-300 scrollbar-track-gray-100">
          <PostForm userName={user} />


          {/* mapping the posts */}
          {posts
            .slice() // Create a copy to avoid mutating state directly
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date
            .map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
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
          <div className="h-10 pt-10"></div>

          {/* Comment Modal */}
          {selectedPost && (
            <Dialog
              visible={visible}
              onHide={() => setVisible(false)}
              className="rounded-md p-5 w-[30vw] border border-gray-500 bg-white shadow-lg" // Background for the modal
              draggable={false} // Prevents dragging
              modal={true} // Makes it a modal
            >
              <div className="space-y-3 bg-white p-4 w-full rounded-md shadow-md">
                {" "}
                <h1 className="font-bold">Comments:</h1>
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
                        <strong className="text-blue-800">{c.userName}</strong>
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
