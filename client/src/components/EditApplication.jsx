import { useEffect, useState } from "react";

function EditApplication({ application }) {
  const [editApplication, setEditApplication] = useState({
    company_name: "",
    job_title: "",
    date_applied: "",
    status: "applied",
    notes: "",
  });

  // Set initial values when the application prop changes
  useEffect(() => {
    if (application) {
      setEditApplication({
        company_name: application.company_name,
        job_title: application.job_title,
        date_applied: application.date_applied
          ? formatDate(application.date_applied)
          : "", // Ensure the format is correct
        status: application.status,
        notes: application.notes,
      });
    }
  }, [application]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
  };

  const handleEdit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const body = { ...editApplication }; // Use current state directly
      await fetch(`http://localhost:5000/applications/${application.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/"; // Redirect after successful edit
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditApplication((prevEditApplication) => ({
      ...prevEditApplication,
      [name]: value,
    }));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${application.id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${application.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Job Application</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleEdit}>
                <label htmlFor="company_name">Company Name:</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  required
                  className="form-control"
                  onChange={handleChange}
                  value={editApplication.company_name}
                />

                <label htmlFor="job_title">Job Title:</label>
                <input
                  type="text"
                  id="job_title"
                  name="job_title"
                  required
                  className="form-control"
                  onChange={handleChange}
                  value={editApplication.job_title}
                />

                <label htmlFor="date_applied">Date Applied:</label>
                <input
                  type="date"
                  id="date_applied"
                  name="date_applied"
                  required
                  className="form-control"
                  onChange={handleChange}
                  value={editApplication.date_applied}
                />

                <label className="form-label">Application Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  required
                  onChange={handleChange}
                  value={editApplication.status}
                >
                  <option value="applied">Applied</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="rejected">Rejected</option>
                </select>

                <label htmlFor="notes">Notes:</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  className="form-control"
                  onChange={handleChange}
                  value={editApplication.notes}
                ></textarea>

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

export default EditApplication;
