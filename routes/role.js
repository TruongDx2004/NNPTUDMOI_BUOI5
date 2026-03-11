const express = require("express");

const {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    getUsersByRole
} = require("../controllers/roleController");

const router = express.Router();

router.post("/", createRole);
router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

// /roles/:id/users
router.get("/:id/users", getUsersByRole);

module.exports = router;