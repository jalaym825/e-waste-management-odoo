const Razorpay = require('razorpay');
const secret = process.env.RAZORPAY_SECRET;
const id = process.env.RAZORPAY_ID;
const crypto = require('crypto');
const prisma = require('../../utils/prisma');

const createOrder = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: id,
            key_secret: secret
        })

        const options = {
            amount: req.body.rupees * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };
        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}

const paymentSuccess = async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            pickupId
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // make collection request success
        await prisma.collectionRequest.update({
            where: {
                id: pickupId
            },
            data: {
                status: "COMPLETED",
            },
        });

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.json({ msg: "Transaction not legit!" });
        // return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

module.exports = {
    createOrder,
    paymentSuccess
}