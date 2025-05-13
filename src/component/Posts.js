import React, { useState, useEffect } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:4000/api/posts/${editId}`, { title });
        setEditId(null);
      } else {
        await axios.post("http://localhost:4000/api/posts", { title });
      }
      setTitle("");
      fetchPosts();
    } catch (err) {
      console.error("Error submitting post", err);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setEditId(post.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  return (
    <div>
      <h2>Posts Page</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} Post</button>
      </form>

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "10px" }}>
            <strong>{post.title}</strong>
            <div>
              <button onClick={() => handleEdit(post)} style={{ marginRight: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
