import { useState } from "react";
import axios from "axios";

const PostForm = ({ userId }) => {
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption && !photo) return alert("Post cannot be empty!");

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("caption", caption);
    if (photo) formData.append("photo", photo);

    try {
      const response = await axios.post("http://localhost:8080/createPost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        alert("Post Created!");
        setCaption("");
        setPhoto(null);
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border p-2 rounded-md"
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="mt-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
