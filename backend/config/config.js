import mongoose from 'mongoose';
import 'colors';

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add other options if needed
    });

    console.log(`MongoDB database connected to ${conn.connection.host}`.bgCyan.white);
  } catch (error) {
    console.error(`DB connection error`.bgRed.white);
    console.error(`Connection URL: ${url}`.red); 
    console.error(error.message.red);

    process.exit(1);
  }
};

export default connectDB;

