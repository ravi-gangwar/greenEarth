import dotenv from 'dotenv';
import 'colors';
import treeModel from './model/treeListModel.js';
import connectDB from './config/config.js';
import trees_list from './data.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await treeModel.deleteMany();
    const sampleData = trees_list.map(tree => ({ ...tree }));
    await treeModel.insertMany(sampleData); // Use the 'menu' model
    console.log('DATA Imported'.bgGreen.white);
    process.exit(0); // Exit the process gracefully
  } catch (error) {
    console.log(`${error}`.bgRed.white);
    process.exit(1); // Exit with an error code
  }
};

const dataDestroy = () => {
  // Implement the code for deleting data here
};

if (process.argv[2] === '-d') {
  dataDestroy();
} else {
  importData();
}
