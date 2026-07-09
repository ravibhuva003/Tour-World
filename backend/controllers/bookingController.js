import Booking from "../models/Booking.js";
import Stripe from "stripe";

//create a new Booking
export const createBooking = async(req,res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({
            success:true,
            message:"Your tour is booked",
            data:savedBooking
        });
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
};


//get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);
        res.status(200).json({
            success:true,
            message:"Successful",
            data:book
        });
    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Not Found!",
        });
    }
};

//get single booking
export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find();
        res.status(200).json({
            success:true,
            message:"Successful",
            data:books
        });
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
};

// get bookings by user
export const getBookingsByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const books = await Booking.find({ userId: userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success:true,
            message:"Successful",
            data:books
        });
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
};

// update booking
export const updateBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        res.status(200).json({
            success:true,
            message:"Booking updated successfully",
            data:updatedBooking
        });
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Failed to update booking",
        });
    }
};

// delete booking
export const deleteBooking = async (req, res) => {
    const id = req.params.id;
    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Booking deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Failed to delete booking",
        });
    }
};

// create a checkout session
export const createCheckoutSession = async(req, res) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const { tourName, price, guestSize } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: tourName,
                        },
                        unit_amount: price * 100, // amount in cents
                    },
                    quantity: guestSize || 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/thank-you`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/tours`,
        });

        res.status(200).json({
            success: true,
            message: "Successfully created checkout session",
            url: session.url
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to create checkout session"
        });
    }
};