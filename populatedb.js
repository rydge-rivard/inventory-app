#! /usr/bin/env node

console.log(
  'This script populates some test parts, categories, and vehicles to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Part = require("./models/part");
const Vehicle = require("./models/vehicle");

const categories = [];
const vehicles = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createVehicles();
  await createParts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  //   category[index] = category;
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function vehicleCreate(index, manufacturer, model, year) {
  const vehicleDetail = { manufacturer: manufacturer, model: model };
  if (year != false) vehicleDetail.year = year;

  const vehicle = new Vehicle(vehicleDetail);

  await vehicle.save();
  //   vehicle[index] = vehicle;
  vehicles.push(vehicle);
  console.log(`Added vehicle: ${manufacturer} ${model}`);
}

async function partCreate(
  index,
  name,
  vehicle,
  category,
  description,
  price,
  number_in_stock
) {
  const partDetail = {
    name: name,
    description: description,
    price: price,
    number_in_stock: number_in_stock,
  };
  if (category != false) partDetail.category = category;
  if (vehicle != false) partDetail.vehicle = vehicle;

  const part = new Part(partDetail);
  await part.save();
  part[index] = part;
  console.log(`Added part: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Maintenance",
      "A collection of parts to maintain and service your vehicle."
    ),
    categoryCreate(
      1,
      "Suspension",
      "A collection of parts to service your suspension components."
    ),
    categoryCreate(
      2,
      "Brakes",
      "A collection of brake parts to keep your vehicle safe on the road."
    ),
  ]);
}

async function createVehicles() {
  console.log("Adding vehicles");
  await Promise.all([
    vehicleCreate(0, "GMC", "Sierra 2500", "2003-1-1"),
    vehicleCreate(1, "GMC", "Sierra 1500", "2003-1-1"),
    vehicleCreate(2, "GMC", "Yukon", "2005-1-1"),
    vehicleCreate(3, "GMC", "Envoy", "2001-1-1"),
    vehicleCreate(4, "Ford", "Lightning", "2002-1-1"),
  ]);
}

async function createParts() {
  console.log("Adding parts");
  await Promise.all([
    partCreate(
      0,
      "Control Arm",
      vehicles[0],
      categories[1],
      "Factory replacement for control arm including hardware.",
      "140",
      "4"
    ),
    partCreate(
      0,
      "Control Arm",
      vehicles[2],
      categories[1],
      "Factory replacement for control arm including hardware.",
      "129",
      "1"
    ),
    partCreate(
      0,
      "Control Arm",
      vehicles[1],
      categories[1],
      "Factory replacement for control arm including hardware.",
      "149",
      "2"
    ),
    partCreate(
      0,
      "Upper Ball Joint",
      vehicles[3],
      categories[1],
      "Factory replacement for upper ball joint including hardware.",
      "49",
      "9"
    ),
    partCreate(
      0,
      "Brake Pads",
      vehicles[3],
      categories[2],
      "Factory replacement brake pads including hardware.",
      "39",
      "14"
    ),
    partCreate(
      0,
      "Brake Pads",
      vehicles[2],
      categories[2],
      "Factory replacement brake pads including hardware.",
      "39",
      "14"
    ),
    partCreate(
      0,
      "Brake Pads",
      vehicles[1],
      categories[2],
      "Factory replacement brake pads including hardware.",
      "39",
      "14"
    ),
    partCreate(
      0,
      "Wix Oil Filter",
      vehicles[1],
      categories[0],
      "Wix oil filter including gasket.",
      "9",
      "44"
    ),
    partCreate(
      0,
      "Mann Oil Filter",
      vehicles[4],
      categories[0],
      "Mann oil filter including gasket.",
      "14",
      "30"
    ),
  ]);
}
