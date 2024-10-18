import { useState } from "react";

function AddApplication() {
  const [application, setApplication] = useState({
    company_name: "",
    job_title: "",
    date_applied: "",
    status: "",
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
      window.location = "/";
    } catch (err) {
      console.error(err.message);
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
              <form>
                <label for="company_name">Company Name:</label>
                <br />
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  maxLength="255"
                  required
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                />
                <br />
                <br />

                <label for="job_title">Job Title:</label>
                <br />
                <input
                  type="text"
                  id="job_title"
                  name="job_title"
                  maxLength="255"
                  required
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                />
                <br />
                <br />

                <label for="date_applied">Date Applied:</label>
                <br />
                <input
                  type="date"
                  id="date_applied"
                  name="date_applied"
                  required
                  className="form-control text-center"
                  onChange={(e) => handleChange(e)}
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
                  >
                    <option value="applied" className="text-center">
                      Applied
                    </option>
                    <option value="interviewed" className="text-center">
                      Interviewed
                    </option>
                    <option value="rejected" className="text-center">
                      Rejected
                    </option>
                  </select>
                </div>

                <br />
                <br />

                <label for="notes">Notes:</label>
                <br />
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  cols="50"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                ></textarea>
                <br />
                <br />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success"
                  onClick={(e) => addApplication(e)}
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
