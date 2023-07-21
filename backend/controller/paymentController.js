const stripe = require('stripe')('sk_test_51MycIqD2171rDQ1bM2Vo43LraZJVqjoKBvTbP7yl52C5ShEqWmsSrT7kktdyrtUAuRwrOD8HRmqXnfFOXPULc7Xr00A9NYeUOU')
const AsyncHandler = require('express-async-handler');

const chargeAmount = AsyncHandler(async(req, res) => {
    let lineItems = [];
    let item = req.body.item;
        lineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images:[item.image],
                },
                unit_amount:item.price*1000
            },
            quantity:item.quantity,
        })


    // create the stripe session
    const stripeSession = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://localhost:3000/api/users/login',
        cancel_url:'https://localhost:3000/api/users/register'
    })
    res.send(JSON.stringify({
        url: stripeSession.url
    }));
})

module.exports = {
    chargeAmount
}