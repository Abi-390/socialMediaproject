import { useState } from "react";
import { createPost } from "../api/posts";

export default function PostForm({ onPostCreated }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    try {
      await createPost(file);
      setFile(null);
      onPostCreated(); // refresh feed
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Post"}
      </button>
    </form>
  );
}
