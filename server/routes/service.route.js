const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");

// Get all services
router.get("/", serviceController.getAllServices);

// Get service by slug
router.get("/slug/:slug", serviceController.getServiceBySlug);

// Get service by ID
router.get("/:id", serviceController.getServiceById);

// Create new service
router.post("/", serviceController.createService);

// Update service
router.put("/:id", serviceController.updateService);

// Delete service
router.delete("/:id", serviceController.deleteService);

module.exports = router;
