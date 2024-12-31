import request from "supertest";
import app from "../../src/app"; // Import your Express app

jest.mock("../../src/models/bookingModel");

describe("Booking Routes", () => {
  it("GET /api/bookings - should fetch bookings by userName", async () => {
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

    const Booking = require("../../src/models/bookingModel");
    Booking.find.mockResolvedValue(mockBookings);

    const response = await request(app).get("/api/bookings?userName=John%20Doe");

    expect(response.status).toBe(200);
    expect(response.body.bookings).toEqual(mockBookings);
  });
});
