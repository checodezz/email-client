const LoadMoreButton = ({ loading, handleLoadMore }) => {
  return (
    <div className="text-center mt-2 mb-4">
      <button
        className="btn btn-outline-primary"
        onClick={handleLoadMore}
        disabled={loading}
        style={{ border: "none", backgroundColor: "transparent" }}
      >
        <span style={{ color: "#0d6efd" }}>
          {loading ? "Loading..." : "Load More"}
        </span>
      </button>
    </div>
  );
};

export default LoadMoreButton;
