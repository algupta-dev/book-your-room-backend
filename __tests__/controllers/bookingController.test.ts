import { Request, Response } from "express";
import { getBookings } from "../../src/controllers/bookingController";
import Booking from "../../src/models/bookingModel";

// Mock the Booking model
jest.mock("../../src/models/bookingModel");

describe("Booking Controller - getBookings", () => {
  it("should return bookings for a given userName", async () => {
    // Mock request and response
    const req = { query: { userName: "John Doe" } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock data
    const mockBookings = [
      {
        _id: "12345",
        userName: "John Doe",
        hotel: "Hotel A",
        rooms: 2,
        checkIn: "2024-01-10",
        checkOut: "2024-01-15",
      },
    ];

    // Mock Booking.find
    (Booking.find as jest.Mock).mockResolvedValue(mockBookings);

    // Call the controller
    await getBookings(req as Request, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Bookings", bookings: mockBookings });
  });

  it("should return 404 if no bookings found", async () => {
    const req = { query: { userName: "Unknown User" } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Booking.find as jest.Mock).mockResolvedValue([]);

    await getBookings(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No bookings found for the provided userName" });
  });
});
