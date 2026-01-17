import { useState } from "react";
import { createPost } from "../api/posts";

export default function PostForm({ onPostCreated }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!file) {
      setStatus("Please select an image to upload.");
      return;
    }

    setLoading(true);
    setStatus("Please wait, our backend servers are starting…");

    try {
      await createPost(file);
      setFile(null);
      setStatus("");
      onPostCreated();
    } catch (error) {
      const code = error.response?.data?.code;

      if (code === "SERVER_COLD_START") {
        setStatus("Please wait, our backend servers are starting…");
      } else if (code === "AI_RATE_LIMIT") {
        setStatus(
          "Free AI request limit reached for now. Please try again later."
        );
      } else if (code === "NO_FILE") {
        setStatus("Please select an image to upload.");
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/90 p-4 rounded-xl shadow-xl space-y-4"
    >
      
      <label
        htmlFor="image-upload"
        className="
          flex items-center justify-between cursor-pointer
          bg-zinc-800 hover:bg-zinc-700
          text-zinc-200 px-4 py-3 rounded-lg
          transition-all duration-200
        "
      >
        <span className="text-sm truncate">
          {file ? file.name : "Select an image"}
        </span>

        <span
          className="
            bg-gradient-to-r from-rose-500 to-orange-400
            text-white text-xs font-semibold px-3 py-1 rounded
          "
        >
          Browse
        </span>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>

     
      <button
        type="submit"
        disabled={loading}
        className="
          w-full py-2 rounded-lg font-semibold text-white
          bg-gradient-to-r from-rose-500 to-orange-400
          disabled:opacity-50 transition-all duration-300
        "
      >
        {loading ? "Processing…" : "Post"}
      </button>

      
      {status && (
        <p className="text-center text-sm text-zinc-400 mt-2">
          {status}
        </p>
      )}
    </form>
  );
}
