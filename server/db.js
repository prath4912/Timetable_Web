// db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = 'mongodb+srv://prath:bWeVrniGrSr3spod@cluster0.yxjap8r.mongodb.net/timetable';
        // const mongoURI = 'mongodb://localhost:27017/timetable';

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;
