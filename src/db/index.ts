import mongoose, { Schema } from 'mongoose';

const uri =
  'mongodb+srv://dailv:ledai2000@cluster0.viixj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string

export async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function closeConnection() {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
}

const loopingSchema = new Schema({
  symbolCoin: String,
  looping: Number,
});

export const loopingModel = mongoose.model('looping', loopingSchema);
