import { useState } from "react";
import axios from "axios";

export default function PostForm({ userName }) {
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0])); // Show preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // ✅ Step 1: Upload Image First (if file is selected)
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadResponse = await axios.post("http://localhost:8080/api/posts/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadResponse.data.imageUrl; // Get uploaded image URL
      }

      // ✅ Step 2: Upload Post with Caption & Image URL
      const postResponse = await axios.post("http://localhost:8080/posts/create", {
        userName,
        caption,
        imageUrl, // Attach image URL to the post
      });

      setMessage("Post created successfully!");
      setCaption("");
      setFile(null);
      setPreview(null);
    } catch (error) {
      setMessage("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white max-w-md mx-auto mt-2 p-2 border rounded-lg shadow-lg">
      <h2 className="text-md font-bold">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full px-2 border border-gray-400 rounded"
          placeholder="Write your caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && <img src={preview} alt="Preview" width="100px" />}
        </div>
        <button
          type="submit"
          className="mt-2 h-auto w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
