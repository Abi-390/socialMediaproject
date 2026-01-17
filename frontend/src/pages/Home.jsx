import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import PostForm from "../components/PostForm";
import { deletePost } from "../api/posts";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;

    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      alert("Failed to delete post",err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Post</h1>

        <PostForm onPostCreated={fetchPosts} />

        <div className="mt-6 space-y-6">
          {loading && <p className="text-center">Loading...</p>}

          {!loading && posts.length === 0 && (
            <p className="text-center text-gray-500">No posts yet</p>
          )}

          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded shadow p-4">
              <img src={post.image} alt="post" className="w-full rounded" />

              <p className="mt-3 text-lg">{post.caption}</p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">@{post.user?.username}</p>

                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
