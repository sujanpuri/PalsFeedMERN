import { useState, useEffect } from "react";
import axios from "axios";

// Fetches all the posts from the backend & maps them into postItem

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAllPosts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mt-4">
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white p-4 shadow-md rounded-md mb-4">
            <div className="flex items-center">
              <img src={post.userId.profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              <h3 className="font-semibold">{post.userId.name}</h3>
            </div>
            <p className="mt-2">{post.caption}</p>
            {post.photo && <img src={post.photo} alt="Post" className="w-full mt-2 rounded-md" />}
            <div className="flex justify-between mt-2">
              <span>❤️ {post.likes.length} Likes</span>
              <span>💬 {post.comments.length} Comments</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
