import mongoose, {Schema, Document} from 'mongoose';

export interface IBooking extends Document {
    hotel: mongoose.Types.ObjectId;
    userName: string;
    rooms: number;
    checkIn: Date;
    checkOut: Date;
}

const BookingSchema: Schema = new Schema({
    hotel: {type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true},
    userName: {type: String, required: true},
    rooms: {type: Number, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
});

export default mongoose.model<IBooking>("Booking", BookingSchema);