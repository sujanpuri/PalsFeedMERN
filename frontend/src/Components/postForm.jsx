import { useState } from "react";
import axios from "axios";

export default function PostForm({ userName }) {
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");

//   console.log(userName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/posts/create", {
        userName,
        caption,
      });
      setMessage(response.data.message);
      setCaption("");
    } catch (error) {
      setMessage("Error creating post");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-2 border rounded-lg shadow-lg">
      <h2 className="text-md font-bold">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full px-2 border border-gray-400 rounded"
          placeholder="Write your caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-2 h-auto w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
