// Archive.jsx – Full Premium Version
import React, { useState, useEffect } from "react";
import "../styles/premium-papers.css";

const Archive = () => {
  const [papers, setPapers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const papersPerPage = 6;

  // ----------------------------
  // LOAD SAMPLE DATA (Replace with API later)
  // ----------------------------
  useEffect(() => {
    const samplePapers = [
      {
        id: 1,
        title: "AI in Healthcare",
        author: "John Doe",
        category: "Computer Science",
        year: 2024,
        url: "#",
      },
      {
        id: 2,
        title: "Quantum Computing Future",
        author: "Sarah Paul",
        category: "Physics",
        year: 2023,
        url: "#",
      },
      {
        id: 3,
        title: "Deep Learning for NLP",
        author: "Michael Lee",
        category: "Computer Science",
        year: 2022,
        url: "#",
      },
      {
        id: 4,
        title: "Climate Change Analysis",
        author: "Emma White",
        category: "Environmental Science",
        year: 2024,
        url: "#",
      },
      {
        id: 5,
        title: "Blockchain Security",
        author: "Ravi Sharma",
        category: "Information Security",
        year: 2023,
        url: "#",
      },
    ];

    setPapers(samplePapers);
    setFiltered(samplePapers);
  }, []);

  // ----------------------------
  // HANDLE FILTERS & SORTING
  // ----------------------------
  useEffect(() => {
    let result = [...papers];

    // Search
    if (search.trim() !== "") {
      result = result.filter(
        (paper) =>
          paper.title.toLowerCase().includes(search.toLowerCase()) ||
          paper.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filtering
    if (category !== "All") {
      result = result.filter((paper) => paper.category === category);
    }

    // Sorting
    if (sortBy === "latest") {
      result.sort((a, b) => b.year - a.year);
    } else {
      result.sort((a, b) => a.year - b.year);
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [search, category, sortBy, papers]);

  // ----------------------------
  // PAGINATION LOGIC
  // ----------------------------
  const lastIndex = currentPage * papersPerPage;
  const firstIndex = lastIndex - papersPerPage;
  const currentPapers = filtered.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filtered.length / papersPerPage);

  // ----------------------------
  // CATEGORY LIST
  // ----------------------------
  const categories = [
    "All",
    "Computer Science",
    "Physics",
    "Environmental Science",
    "Information Security",
  ];

  return (
    <div className="premium-archive-page">
      {/* ---------------- HEADER ---------------- */}
      <header className="premium-header">
        <h1 className="premium-title">📚 Research Archive</h1>
        <p className="premium-subtitle">
          Explore research papers organized by categories, authors, and year.
        </p>
      </header>

      {/* ---------------- FILTERS ---------------- */}
      <div className="premium-filters">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="premium-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="premium-dropdown"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="premium-dropdown"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* ---------------- PAPER GRID ---------------- */}
      <div className="premium-grid">
        {currentPapers.length === 0 ? (
          <p className="no-results">No papers found.</p>
        ) : (
          currentPapers.map((paper) => (
            <div key={paper.id} className="premium-card">
              <h3 className="premium-card-title">{paper.title}</h3>

              <p className="premium-card-meta">
                <strong>Author:</strong> {paper.author}
              </p>

              <p className="premium-card-meta">
                <strong>Category:</strong> {paper.category}
              </p>

              <p className="premium-card-meta">
                <strong>Year:</strong> {paper.year}
              </p>

              <a href={paper.url} className="premium-btn">
                View Paper
              </a>
            </div>
          ))
        )}
      </div>

      {/* ---------------- PAGINATION ---------------- */}
      <div className="premium-pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Archive;
