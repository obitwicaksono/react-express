const express = require("express");
const router = express.Router();
const UserController = require("../controller/users");

// CREATE - POST
router.post("/", UserController.createNewUser);
// READ - GET
router.get("/", UserController.getAllUsers);
// READ (BY ID) - GET
router.get("/:idUser", UserController.getUserById);
// UPDATE - PATCH
router.patch("/:idUser", UserController.updateUser);
// DELETE - DELETE
router.delete("/:idUser", UserController.deleteUser)

module.exports = router;