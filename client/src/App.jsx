import { useEffect, useState } from "react";
import { fetchEmails } from "./store/emailSlice";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from "./components/Filter";
import EmailList from "./components/EmailList";
import LoadMoreButton from "./components/LoadMoreButton";
import { loadFromSessionStorage } from "./store/emailSlice";

function App() {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState("All");
  const { currentPage, loading } = useSelector((state) => state.emails);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleLoadMore = () => {
    dispatch(fetchEmails(currentPage + 1));
  };

  useEffect(() => {
    const emailList = loadFromSessionStorage();
    if (!emailList) {
      dispatch(fetchEmails(1));
    }
  }, [dispatch]);

  return (
    <>
      <main className="mt-4 px-5">
        <Filter
          activeFilter={activeFilter}
          handleFilterChange={handleFilterChange}
        />
        <EmailList activeFilter={activeFilter} />

        <LoadMoreButton loading={loading} handleLoadMore={handleLoadMore} />
      </main>
    </>
  );
}

export default App;
