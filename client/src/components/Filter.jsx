const Filter = ({ activeFilter, handleFilterChange }) => {
  return (
    <section>
      <p className="filter-label">Filter By:</p>
      <div className="filter-container">
        {["All", "Unread", "Read", "Favorites"].map((filter) => (
          <span
            key={filter}
            className={`filter-option ${
              activeFilter === filter ? "active" : ""
            }`}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Filter;
