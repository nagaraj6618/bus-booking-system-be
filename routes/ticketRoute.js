const express = require("express");
const { getAllBooking, addNewBooking, getBookingById, updateBookingById, deleteBookingById,  } = require("../controllers/ticketController");

const router = express.Router();

router.route("/").get(getAllBooking).post(addNewBooking);
router.route("/:id").get(getBookingById).put(updateBookingById).delete(deleteBookingById);


module.exports = router;