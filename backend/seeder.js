import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

// IMPORT DATA
const importData = async () => {
  try {
    // clear all model data (orders, products, users)
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // add imported user data to database as User models
    const createdUsers = await User.insertMany(users);

    // create the admin user which will always be the first user from the user seeder data
    const adminUser = createdUsers[0]._id;

    // get all imported product data as sample products and for each one at a property of user which refers to the admin user
    // the admin user is the only user to have access to all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // insert sample products into the database
    await Product.insertMany(sampleProducts);

    // exit the process
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    // if there is an error log it and exit the process with error code
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// DESTROY DATA
const destroyData = async () => {
  try {
    // clear all model data (orders, products, users)
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // exit the process
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    // if there is an error log it and exit the process with error code
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// check for the '-d' flag was entered into the command line to destroy data or import if it doesn't exist
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
