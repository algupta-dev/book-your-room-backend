import { Request, Response } from "express";
import Hotel, { IHotel } from "../models/hotelModel";

// Create a new hotel
export const createHotel = async (req: Request, res: Response) => {
    try {
      const hotel: IHotel = new Hotel(req.body);
      await hotel.save();
      res.status(201).json({ message: "Hotel created successfully", hotel });
    } catch (error) {
      res.status(500).json({ message: "Failed to create Hotel", error });
    }
  };

// get all bookings
export const getAllHotel = async (req: Request, res: Response) => {
    try {
        const {location} = req.query; 
        const query = location ? {location: {$regex: location, $options: "i"}} : {};
        const hotels = await Hotel.find(query);
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get hotels', error })
    }
};