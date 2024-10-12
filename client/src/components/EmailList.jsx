import moment from "moment";
import { useSelector } from "react-redux";
import { useState } from "react";
import EmailDetails from "./EmailDetails";

const EmailList = () => {
  const { emailList } = useSelector((state) => state.emails);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
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

  return (
    <div className="container-fluid mt-4" aria-labelledby="email-list-title">
      <h2 id="email-list-title" className="visually-hidden">
        Email List
      </h2>
      {selectedEmail ? (
        <div className="row">
          <div className="col-md-5">
            {emailList.map((email) => (
              <article
                className={`email-card mb-3 d-flex align-items-start text-muted ${
                  selectedEmail.id === email.id ? "active-email" : ""
                }`}
                key={email.id}
                onClick={() => handleEmailClick(email)}
                style={{ cursor: "pointer" }}
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
                      &lt;
                      {email.from.email}&gt;
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
          {emailList.map((email) => (
            <article
              className={`email-card mb-3 d-flex align-items-start text-muted ${
                selectedEmail?.id === email.id ? "active-email" : ""
              }`}
              key={email.id}
              onClick={() => handleEmailClick(email)}
              style={{ cursor: "pointer" }}
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
                    &lt;
                    {email.from.email}&gt;
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
          className="btn btn-outline-secondary position-fixed top-0 end-0 m-3 mt-4 me-5"
          onClick={handleResetClick}
        >
          Close Details
        </button>
      )}
    </div>
  );
};

export default EmailList;
