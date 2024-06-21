const express = require("express");
const { getAllBookedTicket, addNewTicketBooking, getBookedTicketById, updateBookedTicketById, deleteBookedTicketById,  } = require("../controllers/ticketController");
const { verifyValidUser, verifyAdmin } = require("../controllers/authVerify");

const router = express.Router();

router.route("/").get(verifyValidUser,getAllBookedTicket).post(verifyValidUser,addNewTicketBooking);
router.route("/:id").get(verifyValidUser,getBookedTicketById).put(verifyValidUser,updateBookedTicketById).delete(verifyAdmin,deleteBookedTicketById);


module.exports = router;