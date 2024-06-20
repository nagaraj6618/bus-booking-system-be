const express = require("express");
const { getAllBooking, addNewBooking, getBookingById, updateBookingById, deleteBookingById,  } = require("../controllers/ticketController");
const { verifyValidUser } = require("../controllers/authVerify");

const router = express.Router();

router.route("/").get(verifyValidUser,getAllBooking).post(verifyValidUser,addNewBooking);
router.route("/:id").get(verifyValidUser,getBookingById).put(verifyValidUser,updateBookingById).delete(verifyValidUser,deleteBookingById);


module.exports = router;