import { Router } from "express";
import { getAllHotel, createHotel } from "../controllers/hotelController";

const router = Router();

router.get('/', getAllHotel);
router.post('/', createHotel);

export default router;