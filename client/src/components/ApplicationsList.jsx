import { useState, useEffect } from "react";

// components
import AddApplication from "./AddApplication";
import EditApplication from "./EditApplication";

function ApplicationsList() {
  const [applications, setApplications] = useState([]);

  const deleteApplication = async (id) => {
    try {
      const deletedID = id;
      const response = await fetch(
        `http://localhost:5000/applications/${deletedID}`,
        { method: "DELETE" }
      );
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application.id !== id)
      );
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllApplications = async () => {
    try {
      const response = await fetch("http://localhost:5000/applications");
      const jsonData = await response.json();
      setApplications(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllApplications();
  }, []);

  return (
    <>
      <div className="container text-center mt-5">
        <h1>Job Applications</h1>
        <AddApplication />
        <div className="row mt-5">
          {applications.map((application, index) => {
            const formattedDate = new Date(application.date_applied)
              .toISOString()
              .split("T")[0];

            return (
              <div key={index} className="col-md-4">
                <div
                  className="card mt-5"
                  style={{
                    backgroundColor: `rgba(var(--bs-primary-rgb), 0.5)`,
                  }}
                >
                  <div className="card-header">{application.company_name}</div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{application.job_title}</li>
                    <li className="list-group-item">{formattedDate}</li>{" "}
                    <li className="list-group-item">{application.status}</li>
                    <li className="list-group-item">{application.notes}</li>
                  </ul>
                  <div className="card-body">
                    <EditApplication application={application} />
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteApplication(application.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ApplicationsList;
