const express = require("express");
const {
  createTicket,
  createComment,
  updateTicket,
  getcomments,
  getTickets,
  getTicket,
} = require("./controllers/serviceDesk ");
const { registerUser, login, getUser } = require("./controllers/users");
const checkLogin = require("./middlewares/authorization");
const {
  validateEmailAndPasswordFields, validateUserDataFields, validateTicket,
} = require("./middlewares/validateUserData");
const router = express();
const multer = require("./multer");

router.post("/register", multer.single("image"), validateUserDataFields, registerUser);
router.post("/login", validateEmailAndPasswordFields, login);

router.use(checkLogin);

router.get("/users", getUser);
router.post("/tickets", validateTicket, createTicket);
router.post("/tickets/:id/comments", createComment);
router.put("/tickets/:id", updateTicket);
router.get("/tickets/:id/comments", getcomments);
router.get("/tickets", getTickets);
router.get("/tickets/:id", getTicket)

module.exports = router;
