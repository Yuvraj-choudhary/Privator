import express from "express";

const {protect} = require("../middleware/authMiddleWare");
const {registerUser, authUser, allUsers} = require("../controller/userController");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.route("/login").post(authUser);

module.exports = router;