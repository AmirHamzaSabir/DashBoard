const AsyncHandler = require("express-async-handler");
const Counter = require("../models/counterModel")
const Ticket = require("../models/ticketModel");
const { paginateArray } = require("../customFunctons/functions");
const getAllTickets = AsyncHandler(async (req, res) => {
  const tickets = await Ticket.find();
  res.status(200).json({ tickets });
});

const postTicket = AsyncHandler(async (req, res) => {
  var serialNumber;
  try {
    // This is to check and implement the counter and get the serialNumber value
      const counterObj  = await Counter.findOneAndUpdate(
        {id : "autoval"},
        {"$inc": {"seq" : 1}},
        {new:true},
      )
      console.log(counterObj);
      if(counterObj === null) {
        await Counter.create({id: "autoval",  seq: 1});
        serialNumber = 1
    }else{
        serialNumber = counterObj.seq;
    }
    // Here we will create a document with the serial number value
    const ticket = await Ticket.create({...req.body, serialNumber});
    console.log(ticket);
    res.status(200).json({ ticket});
  } catch (err) {
    res.status(403);
    throw new Error("Error while creating Ticket");
  }
});

const getSingleTicket = AsyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.status(200).json(ticket);
})
const getTicketsChunk = AsyncHandler(async (req, res) => {
  const tickets = await Ticket.find();
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    status = "",
    sortColumn = 'name'
  } = req.body

  /* eslint-disable  */
  var num = parseInt(q)

  const queryLowered = typeof num === NaN ? q.toLowerCase() : num

  const dataAsc = tickets.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user => {
      return  (user.serialNumber === queryLowered) ||
      user.status.toLowerCase() === status.toLowerCase()
    }
     
  )

  /* eslint-enable  */
    const response = {
      total: filteredData.length,
      users: paginateArray(filteredData, perPage, page)
    }
    res.status(200).json(response)
 
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
  updateTicket,
  getTicketsChunk
};
