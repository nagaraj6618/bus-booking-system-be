const express = require('express');
const { getAllBus, addNewBus, getBusById, updateBusDetails, deleteBusById } = require('../controllers/busController');
const { verifyAdmin } = require('../controllers/authVerify');
const router = express.Router();

router.route('/').get(getAllBus).post(verifyAdmin,addNewBus);
router.route('/:id').get(getBusById).put(verifyAdmin,updateBusDetails).delete(verifyAdmin,deleteBusById);

module.exports = router;