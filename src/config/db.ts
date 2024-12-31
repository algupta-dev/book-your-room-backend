import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/hotelBooking');
    } catch (error) {
        console.error('MongoDB connect failed:', error);
        process.exit();
    }
};

export default connectDB;