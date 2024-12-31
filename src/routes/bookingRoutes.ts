import { Router } from "express";
import {
 createBooking,
 getBookings, 
 updateBooking, 
 cancelBooking
} from "../controllers/bookingController";

const router = Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.put('/:id', updateBooking);
router.delete('/:id', cancelBooking);

export default router;