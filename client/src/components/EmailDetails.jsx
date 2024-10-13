import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailDetails } from "../store/emailDetailsSlice";
import { toggleFavorite } from "../store/emailSlice";

const EmailDetails = ({ emailId }) => {
  const dispatch = useDispatch();
  const { emailDetail, loading } = useSelector((state) => state.emailDetails);

  const email = useSelector((state) =>
    state.emails.emailList.find((email) => email.id == emailId)
  );

  useEffect(() => {
    if (emailId) {
      dispatch(fetchEmailDetails(emailId));
    }
  }, [dispatch, emailId]);

  if (!emailId) {
    return null;
  }

  const formattedDate = moment(email.date).format("DD/MM/YYYY hh:mm A");
  const senderInitial = email?.from?.name.charAt(0).toUpperCase();

  return (
    <div className="row">
      <div className="col-md-1 d-flex mt-4 ms-3">
        <div
          className="text-white rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            fontSize: 23,
            background: "#e54065",
          }}
        >
          {senderInitial}
        </div>
      </div>
      <div className="col-md-10 mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-3">{email?.subject}</h4>
          <button
            className="custom-button"
            onClick={() => {
              dispatch(toggleFavorite(email?.id));
            }}
          >
            {email.isFavorite ? "Remove from Favorite" : "Mark as Favorite"}
          </button>
        </div>
        <p className="text-muted">{formattedDate}</p>
        {loading ? (
          <div className="col-12 text-center mt-5 pt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {emailDetail && (
              <div
                className="text-muted"
                dangerouslySetInnerHTML={{ __html: emailDetail }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailDetails;
