const AsyncHandler = require("express-async-handler");
const PaymentGateWay = require("../models/paymentGWModel");

const getAllPaymentGateWays = AsyncHandler(async (req, res) => {
  const paymentGateWay = await PaymentGateWay.find();
  res.status(200).json({ paymentGateWay });
});

const postPaymentGateWay = AsyncHandler(async (req, res) => {
  try {
    const { banner, popUp } = req.body;
    if (banner && popUp ) {
        const paymentGateWay = await PaymentGateWay.create({
            ...req.body
          });
          res.status(200).json({ paymentGateWay });
    } else {
      res.status(400);
      throw new Error("Please enter all fields");
    }
  } catch (err) {
    res.status(403);
    throw new Error("Error while creating PaymentGateWay");
  }
});

const getSinglePaymentGateWay = AsyncHandler(async (req, res) => {
  const paymentGateWay = await PaymentGateWay.findById(req.params.id);
  res.status(200).json({paymentGateWay});
})

const updatePaymentGateWay = AsyncHandler(async(req,res)=>{
  const user = req.user;
  var response = null;
if(user.role === 2 || user.role === 1){
  const data = await PaymentGateWay.findById(req.params.id);
  if (data) {
    response = await PaymentGateWay.findOneAndUpdate(
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
  getAllPaymentGateWays,
  postPaymentGateWay,
  getSinglePaymentGateWay,
  updatePaymentGateWay
};
