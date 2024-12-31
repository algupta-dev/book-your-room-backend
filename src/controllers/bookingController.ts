import { Request, Response } from "express";
import Booking, { IBooking } from "../models/bookingModel";
import Hotel from "../models/hotelModel";

// create a new booking
export const createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const {hotel, userName, rooms, checkIn, checkOut} = req.body;

        // check if hotel exists
        const selectedHotel = await Hotel.findById(hotel);
        if(!selectedHotel){
            res.status(404).json({message: "Hotel noyt found"});
            return;
        }

        // check room availability
        if(selectedHotel.roomsAvailable<rooms){
            res.status(400).json({message: "Not enough rooms available"})
            return;
        }

        // create booking
        const booking = new Booking({hotel, userName, rooms, checkIn, checkOut});
        await booking.save();

        // update hotel's room availability
        selectedHotel.roomsAvailable -= booking.rooms;
        await selectedHotel.save();

        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create booking', error })
    }
};


// get all bookings
export const getBookings = async (req: Request, res: Response) => {
    try {
        const {userName} = req.query;
        const bookings = await Booking.find({userName}).populate('hotel');
        res.status(200).json({ message: "Bookings", bookings });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get bookings', error })
    }
};

// update a booking
export const updateBooking = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {checkIn, checkOut}= req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(id, {checkIn, checkOut}, {new: true}).populate("hotel");
        if(!updatedBooking) {
            res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update booking', error })
    }
};

// delete a booking
export const cancelBooking = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const booking = await Booking.findById(id);
        if(!booking) {
            res.status(404).json({ message: "Booking not found" });
        }

        // update hotel's rooms availability
        if(booking){
        const hotel = await Hotel.findById(booking.hotel);
        if(hotel){
            hotel.roomsAvailable+= booking.rooms;
            await hotel.save();
        } 

        // delete booking
        await Booking.findByIdAndDelete(id); 

        res.status(200).json({ message: "Booking canceled successfully", booking });
    }
    } catch (error) {
        res.status(500).json({ message: 'Failed to cancel booking', error })
    }
};