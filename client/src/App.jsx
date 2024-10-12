import { useEffect, useState } from "react";
import { fetchEmails } from "./store/emailSlice";
import { useDispatch } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from "./components/Filter";
import EmailList from "./components/EmailList";

function App() {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState("Unread");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    dispatch(fetchEmails(1));
  }, [dispatch]);

  return (
    <>
      <main className="mt-4 px-5">
        <Filter
          activeFilter={activeFilter}
          handleFilterChange={handleFilterChange}
        />
        <EmailList />
      </main>
    </>
  );
}

export default App;
