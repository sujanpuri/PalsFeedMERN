import { useState } from "react";
import axios from "axios";

// Represents a single post (user photo, caption, like etc...)

const PostItem = ({ post, userId }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    try {
      const response = await axios.post("http://localhost:8080/likePost", {
        postId: post._id,
        userId,
      });
      if (response.data.status) {
        setLikes(response.data.likes);
      }
    } catch (error) {
      alert("Cannot like post.");
      console.log("Error: ", error);
    }
  };

  const handleComment = async(e)=>{
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/commentOnPost", {
            postId: post._id,
            userId,
            text: newComment,
        })

        if(response.data.status){
            setComments([...comments, {userId, text:newComment}]);
            setNewComment("");
        }
    } catch (error) {
      alert("Cannot Comment on the post.");
      console.log("Error: ", error);
    }
  }

  return(
    <div className="bg-white p-4 shadow-md rounded-md mb-4">
      <div className="flex items-center">
        <img src={post.userId.profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
        <h3 className="font-semibold">{post.userId.name}</h3>
      </div>
      <p className="mt-2">{post.caption}</p>
      {post.photo && <img src={post.photo} alt="Post" className="w-full mt-2 rounded-md" />}
      <div className="flex justify-between mt-2">
        <button onClick={handleLike} className="bg-red-500 text-white px-4 py-1 rounded-md">
          ❤️ {likes}
        </button>
        <button className="bg-blue-500 text-white px-4 py-1 rounded-md">💬 {comments.length}</button>
      </div>
      {/* Comment Form */}
      <form onSubmit={handleComment} className="mt-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <button type="submit" className="bg-gray-700 text-white px-4 py-1 rounded-md mt-1">
          Comment
        </button>
      </form>
      {/* Show Comments */}
      <div className="mt-2">
        {comments.map((comment, index) => (
          <p key={index} className="text-sm text-gray-600">{comment.text}</p>
        ))}
      </div>
    </div>
  )
};

export default PostItem;
