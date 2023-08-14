const AsyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");

const getAllTickets = AsyncHandler(async (req, res) => {
  const ticket = await Ticket.find();
  res.status(200).json({ ticket });
});

const postTicket = AsyncHandler(async (req, res) => {
  try {
    const { banner, popUp } = req.body;
    if (banner && popUp ) {
        const ticket = await Ticket.create({
            ...req.body
          });
          res.status(200).json({ ticket });
    } else {
      res.status(400);
      throw new Error("Please enter all fields");
    }
  } catch (err) {
    res.status(403);
    throw new Error("Error while creating Ticket");
  }
});

const getSingleTicket = AsyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.status(200).json({ticket});
})

const updateTicket = AsyncHandler(async(req,res)=>{
  const user = req.user;
  var response = null;
if(user.role === 2 || user.role === 1){
  const data = await Ticket.findById(req.params.id);
  if (data) {
    response = await Ticket.findOneAndUpdate(
      { _id: `${req.params.id}` },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(response);
  }else{
      res.status(404);
      throw new Error("Not Found");
    }
}
else{
  res.status(401);
  throw new Error("You are not authorized");
}
})

module.exports = {
  getAllTickets,
  postTicket,
  getSingleTicket,
  updateTicket
};
