import mongoose, {Schema, Document} from 'mongoose';

export interface IHotel extends Document {
    name: string;
    location: string;
    roomsAvailable: number;
}

const HotelSchema: Schema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    roomsAvailable: {type: Number, required: true},
});

export default mongoose.model<IHotel>("Hotel", HotelSchema);