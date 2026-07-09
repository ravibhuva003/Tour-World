import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createBooking, getAllBooking, getBooking, createCheckoutSession, getBookingsByUser, updateBooking, deleteBooking } from '../controllers/bookingController.js';
const router = express.Router();

router.post('/',verifyUser,createBooking);
router.post('/checkout-session',verifyUser,createCheckoutSession);
router.get('/user/:userId',verifyUser,getBookingsByUser);
router.get('/:id',verifyUser,getBooking);
router.put('/:id',verifyUser,updateBooking);
router.delete('/:id',verifyUser,deleteBooking);
router.get('/',verifyAdmin,getAllBooking);

export default router;