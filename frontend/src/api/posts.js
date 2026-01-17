import api from "./axios";

export const createPost = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return api.post("/api/posts", formData);
};

export const getPosts = () => {
  return api.get("/api/posts");
};
export const deletePost = (id) => {
  return api.delete(`/api/posts/${id}`);
};
