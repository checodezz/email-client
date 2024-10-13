import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import EmailDetails from "./EmailDetails";
import { markAsRead } from "../store/emailSlice";

const EmailList = ({ activeFilter }) => {
  const dispatch = useDispatch();
  const { emailList } = useSelector((state) => state.emails);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    dispatch(markAsRead(email.id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleResetClick = () => {
    setSelectedEmail(null);
  };

  const filteredEmails = emailList.filter((email) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Favorites") return email.isFavorite;
    if (activeFilter === "Read") return email.isRead;
    if (activeFilter === "Unread") return !email.isRead;
    return true;
  });

  return (
    <div className="container-fluid mt-2" aria-labelledby="email-list-title">
      <h2 id="email-list-title" className="visually-hidden">
        Email List
      </h2>
      {selectedEmail ? (
        <div className="row">
          <div className="col-md-5">
            {filteredEmails.map((email) => (
              <article
                className={`email-card mb-3 d-flex align-items-start text-muted ${
                  selectedEmail.id === email.id ? "active-email" : ""
                }`}
                key={email.id}
                onClick={() => handleEmailClick(email)}
                style={{
                  cursor: "pointer",
                  backgroundColor: email.isRead ? "#f2f2f2" : "white",
                }}
              >
                <figure
                  className="email-avatar img-fluid"
                  aria-label={`${email.from.name}'s avatar`}
                >
                  {email.from.name.charAt(0).toUpperCase()}
                </figure>
                <div className="email-details flex-grow-1 ml-3">
                  <header className="email-info">
                    From:{" "}
                    <span className="fw-semibold">
                      {email.from.name.charAt(0).toUpperCase() +
                        email.from.name.slice(1)}{" "}
                      &lt;{email.from.email}&gt;
                    </span>
                    <br />
                    Subject:{" "}
                    <span className="fw-semibold">{email.subject}</span>
                  </header>
                  <section className="email-body mt-2">
                    <p className="short-description">
                      {truncateText(email.short_description, 20)}
                    </p>
                    <div className="email-date">
                      <time dateTime={email.date}>
                        {moment(email.date).format("DD/MM/YYYY hh:mm A")}
                      </time>
                      {email.isFavorite && (
                        <span className="ms-5 fw-semibold favorite-text">
                          Favorite
                        </span>
                      )}
                    </div>
                  </section>
                </div>
              </article>
            ))}
          </div>
          <div className="col-md-7 ">
            <div className="email-body-details">
              <EmailDetails emailId={selectedEmail.id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredEmails.map((email) => (
            <article
              className={`email-card mb-3 d-flex align-items-start text-muted ${
                selectedEmail?.id === email.id ? "active-email" : ""
              }`}
              key={email.id}
              onClick={() => handleEmailClick(email)}
              style={{
                cursor: "pointer",
                backgroundColor: email.isRead ? "#f2f2f2" : "white",
              }}
            >
              <figure
                className="email-avatar"
                aria-label={`${email.from.name}'s avatar`}
              >
                {email.from.name.charAt(0).toUpperCase()}
              </figure>
              <div className="email-details flex-grow-1 ml-3">
                <header className="email-info">
                  From:{" "}
                  <span className="fw-semibold">
                    {email.from.name.charAt(0).toUpperCase() +
                      email.from.name.slice(1)}{" "}
                    &lt;{email.from.email}&gt;
                  </span>
                  <br />
                  Subject: <span className="fw-semibold">{email.subject}</span>
                </header>
                <section className="email-body mt-2">
                  <p className="short-description">{email.short_description}</p>
                  <div className="email-date">
                    <time dateTime={email.date}>
                      {moment(email.date).format("DD/MM/YYYY hh:mm A")}
                    </time>
                    {email.isFavorite && (
                      <span className="ms-5 fw-semibold favorite-text ">
                        Favorite
                      </span>
                    )}
                  </div>
                </section>
              </div>
            </article>
          ))}
        </div>
      )}
      {selectedEmail && (
        <button
          className="btn btn-danger  position-fixed top-0 end-0 m-3 mt-4 me-5"
          onClick={handleResetClick}
          style={{ borderRadius: "50%", background: "#e54064" }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default EmailList;
