const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

// add application
router.post("/applications", applicationController.addApplication);

// get all applications
router.get("/applications", applicationController.getAllplication);

// update an application
router.put("/applications/:id", applicationController.updateApplication);

// delete an applications
router.delete("/applications/:id", applicationController.deleteApplication);

module.exports = router;
