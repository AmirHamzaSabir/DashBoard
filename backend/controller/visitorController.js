const AsyncHandler = require('express-async-handler');
const Visitors = require('../models/visitorModel');


const getTotalUsers = AsyncHandler(async (req, res) => {
    try {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth()
        await Visitors.findOneAndUpdate({
            month: currentMonth,
        }, {
            $inc: {
                count: 1
            }
        }, {
            upsert: true, new: true
        })
        res.json({
            success:'Data Updated'
        })
    } catch (error) {
        throw new Error(error);
    }

})

const getTotalCount = AsyncHandler(async (req, res) => { 
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    var count = await Visitors.findOne({ month: currentMonth });
    count = count === null ? {count:0} : count;
    res.send(count.count.toString())
})


module.exports = {
    getTotalUsers,
    getTotalCount
}