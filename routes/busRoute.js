const express = require('express');
const { getAllBus, addNewBus, getBusById, updateBusDetails, deleteBusById } = require('../controllers/busController');
const router = express.Router();

router.route('/').get(getAllBus).post(addNewBus);
router.route('/:id').get(getBusById).put(updateBusDetails).delete(deleteBusById);

module.exports = router;