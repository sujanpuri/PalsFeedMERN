import { useState } from "react";
import axios from "axios";
import { useUser } from "./userContext";

export default function PostForm({ userName }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { userId } = useUser(); // Get userId from context

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0])); // Show preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let imageUrl = ""; // Declare imageUrl variable to store the URL

    try {
      // Step 1: Upload Image to Cloudinary (only if file is selected)
      if (file) {
        const formData = new FormData();
        formData.append("file", file); // 'file' is used for image uploading
        formData.append("upload_preset", "PalsFeed"); // Cloudinary preset name
        formData.append("cloud_name", "dnngud5vd"); // Cloudinary cloud name

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dnngud5vd/image/upload",
          formData
        );

        const result = res.data; // Result from Cloudinary
        imageUrl = result.secure_url; // Get image URL
        console.log("Image uploaded successfully:", result.secure_url);
      }

      // Step 2: Upload Post with Caption & Image URL (only if imageUrl exists)
      const postResponse = await axios.post(
        "http://localhost:8080/posts/create",
        {
          userId, // Send userId
          userName, // Send userName
          caption,
          imageUrl, // Attach image URL to the post
        }
      );

      if (postResponse.data.status) {
        setMessage("Post created successfully!");
        setCaption(""); // Reset caption field
        setFile(null); // Reset file input
        setPreview(null); // Reset preview
      } else {
        setMessage("Error creating post");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (<div className="bg-white max-w-md mx-auto mt-2 p-2 border rounded-lg shadow-lg">
    <h2 className="text-md font-semibold mb-1">Create a Post</h2>
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full px-2 py-1 border border-gray-300 rounded resize-none min-h-[60px]"
        placeholder="Write your caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      />
      
      {/* Upload Image */}
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-1 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 w-32 text-xs"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-12 h-12 object-cover rounded-lg shadow-md"
          />
        )}
      </div>
  
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition text-sm"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
    {message && <p className="mt-2 text-green-600 text-sm">{message}</p>}
  </div>
  
  );
}
