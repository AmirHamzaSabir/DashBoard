const express = require('express');
const { getAllTickets, getSingleTicket, updateTicket, postTicket, getTicketsChunk } = require('../controller/ticketController');
const { AuthMiddleware } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.get('/get-tickets', getAllTickets);
router.get('/get-single-ticket/:id', getSingleTicket);
router.post('/get-tickets-chunk', getTicketsChunk);
router.post('/add-ticket', postTicket );
router.put('/update-ticket/:id', AuthMiddleware ,updateTicket);

module.exports = router;