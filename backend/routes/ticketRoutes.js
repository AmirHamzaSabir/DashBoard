const express = require('express');
const { getAllTickets, getSingleTicket, updateTicket, postTicket } = require('../controller/ticketController');
const router = express.Router();

router.get('/get-tickets', getAllTickets);
router.get('/get-ticket/:id', getSingleTicket);
router.put('/update-ticket/:id', updateTicket);
router.post('/add-ticket', postTicket);

module.exports = router;