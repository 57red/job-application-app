import { useState } from "react";

function AddApplication() {
  const [application, setApplication] = useState({
    company_name: "",
    job_title: "",
    date_applied: "",
    status: "applied", // Default to "applied"
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication((prevApplication) => ({
      ...prevApplication,
      [name]: value,
    }));
  };

  const addApplication = async (e) => {
    e.preventDefault();
    try {
      const body = {
        company_name: application.company_name,
        job_title: application.job_title,
        date_applied: application.date_applied,
        status: application.status,
        notes: application.notes,
      };
      const response = await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const responseData = await response.json(); // Parse the response

      if (response.ok) {
        console.log("Application added successfully", responseData);
        // Reset form fields
        setApplication({
          company_name: "",
          job_title: "",
          date_applied: "",
          status: "applied", // Reset to default status
          notes: "",
        });
        window.location = "/";
      } else {
        console.error("Failed to add application:", responseData);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary mt-3"
        data-toggle="modal"
        data-target="#myModal"
      >
        Add Application
      </button>

      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Modal Heading</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={(e) => addApplication(e)}>
                <label htmlFor="company_name">Company Name:</label>
                <br />
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  maxLength="255"
                  required
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={application.company_name}
                />
                <br />
                <br />

                <label htmlFor="job_title">Job Title:</label>
                <br />
                <input
                  type="text"
                  id="job_title"
                  name="job_title"
                  maxLength="255"
                  required
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={application.job_title}
                />
                <br />
                <br />

                <label htmlFor="date_applied">Date Applied:</label>
                <br />
                <input
                  type="date"
                  id="date_applied"
                  name="date_applied"
                  required
                  className="form-control text-center"
                  onChange={(e) => handleChange(e)}
                  value={application.date_applied}
                />
                <br />
                <br />

                <div className="mb-3">
                  <label className="form-label">Application Status</label>
                  <select
                    id="status"
                    name="status"
                    className="form-select"
                    required
                    onChange={(e) => handleChange(e)}
                    value={application.status} // Make sure this value is bound to state
                  >
                    <option value="applied">Applied</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <br />
                <br />

                <label htmlFor="notes">Notes:</label>
                <br />
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  cols="50"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={application.notes}
                ></textarea>
                <br />
                <br />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success"
                />
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddApplication;
