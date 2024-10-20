import { useState } from "react";

function EditApplication({ application }) {
  const [editApplication, setEditApplication] = useState({
    company_name: application.company_name,
    job_title: application.job_title,
    date_applied: application.date_applied,
    status: application.status,
    notes: application.notes,
  });

  const handleRetainValue = () => {
    setEditApplication({
      company_name: application.company_name,
      job_title: application.job_title,
      date_applied: application.date_applied,
      status: application.status,
      notes: application.notes,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        company_name: editApplication.company_name,
        job_title: editApplication.job_title,
        date_applied: editApplication.date_applied,
        status: editApplication.status,
        notes: editApplication.notes,
      };
      const response = await fetch(
        `http://localhost:5000/applications/${application.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
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
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${application.id}`}
      >
        Edit
      </button>

      <div class="modal" id={`id${application.id}`} onClick={handleRetainValue}>
        <div class="modal-dialog" onClick={handleRetainValue}>
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Job Application</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={handleRetainValue}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <form>
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
                  value={editApplication.company_name}
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
                  value={editApplication.job_title}
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
                  value={editApplication.date_applied}
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
                    value={editApplication.status}
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
                  value={editApplication.notes}
                ></textarea>
                <br />
                <br />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success"
                  onClick={(e) => handleEdit(e)}
                />
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={handleRetainValue}
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
