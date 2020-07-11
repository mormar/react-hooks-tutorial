import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const toDark = () => setMode("dark");
  const toLight = () => setMode("light");

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const result = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (result.ok) {
          const json = await result.json();
          setPosts(json);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, posts]);

  return (
    <div className={`App ${mode === "dark" ? "dark" : "light"}`}>
      <header className={`App-header`}>
        <h1>React Hooks Tutorial</h1>
        {mode === "dark" ? (
          <button className="btn-dark" onClick={toLight}>
            Light
          </button>
        ) : (
          <button className="btn-ligth" onClick={toDark}>
            Dark
          </button>
        )}
      </header>
      <div className="content-section">
        <input
          className="search"
          type="text"
          value={search}
          placeholder="Search Posts"
          onChange={(e) => setSearch(e.target.value)}
        />
        {error && <h2 className="error-section">Error</h2>}
        {loading && <h2 className="loading-section">Loading</h2>}
        {filteredPosts.map((post) => (
          <div className="post-section" key={post.id}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
