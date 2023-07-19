import React from "react";

function Reply({ reply, deleteReply, startEditingReply }) {
  return (
    <div className="reply">
      <div className="card w-100 mb-4">
        <div className="card-body p-4 d-flex justify-content-between align-items-start">
          <div>
            <h6>
              <strong>User {reply.user_id}:</strong>
            </h6>
            <p className="h6">{reply.reply}</p>
          </div>
          <div className="text-right ml-auto">
            <small className="text-muted">
              Replied on: {new Date(reply.created_on).toLocaleString()}
            </small>
            <div className="mt-2">
              <button
                className="btn btn-sm btn-outline-primary ml-2"
                style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                onClick={startEditingReply}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                onClick={deleteReply}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reply;
