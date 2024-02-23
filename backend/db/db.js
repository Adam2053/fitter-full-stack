import mongoose from 'mongoose';

const connectionToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Server connected to the Database`);
    } catch (error) {
        console.log(`Error while connecting to database: ${error.message}`);
    }
}

export default connectionToDb;