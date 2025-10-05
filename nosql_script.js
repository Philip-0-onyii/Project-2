
// ===== SIMPLE STUDENT INVENTORY MANAGEMENT SYSTEM =====
// using MongoDB style (NoSQL)
// very simple code – no frameworks, no complexity
// coded by a learning student 😊


// ===== 1. CREATE COLLECTIONS =====
use("inventory_db");

db.createCollection("users");
db.createCollection("categories");
db.createCollection("items");
db.createCollection("orders");


// ===== 2. INSERT RECORDS =====

// Insert users
db.users.insertMany([
  { first_name: "John", last_name: "Doe", email: "john@gmail.com", role: "admin" },
  { first_name: "Jane", last_name: "Smith", email: "jane@gmail.com", role: "user" }
]);

// Insert categories
db.categories.insertMany([
  { name: "Electronics", description: "Gadgets and devices" },
  { name: "Furniture", description: "Office and home furniture" }
]);

// Insert items
db.items.insertMany([
  { name: "Laptop", price: 500, size: "m", category_id: ObjectId("66f12f2a1a2b3c4d5e6f7a88"), description: "Portable computer" },
  { name: "Chair", price: 50, size: "l", category_id: ObjectId("66f12f2a1a2b3c4d5e6f7a89"), description: "Office chair" }
]);

// Insert orders
db.orders.insertMany([
  { user_id: ObjectId("66f12f2a1a2b3c4d5e6f7a77"), item_id: ObjectId("66f12f2a1a2b3c4d5e6f7a88"), quantity: 2, status: "pending" }
]);


// ===== 3. GET RECORDS (READ) =====

// Get all items
db.items.find();

// Get all orders
db.orders.find();

// Get all users that are admins
db.users.find({ role: "admin" });


// ===== 4. GET RECORDS FROM TWO OR MORE COLLECTIONS (LOOKUP) =====

// Join orders with items (like SQL JOIN)
db.orders.aggregate([
  {
    $lookup: {
      from: "items",
      localField: "item_id",
      foreignField: "_id",
      as: "item_details"
    }
  },
  { $unwind: "$item_details" }
]);

// Join orders with users (to show who made the order)
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user_details"
    }
  },
  { $unwind: "$user_details" }
]);


// ===== 5. UPDATE RECORDS =====

// Update an item price
db.items.updateOne(
  { name: "Laptop" },
  { $set: { price: 550 } }
);

// Update order status (admin approves)
db.orders.updateOne(
  { status: "pending" },
  { $set: { status: "approved" } }
);


// ===== 6. DELETE RECORDS =====

// Delete an item
db.items.deleteOne({ name: "Chair" });

// Delete all disapproved orders
db.orders.deleteMany({ status: "disapproved" });


// ===== 7. QUERY USING LOOKUP (multiple collections together) =====

// See all approved orders with user and item info
db.orders.aggregate([
  { $match: { status: "approved" } },
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user_details"
    }
  },
  {
    $lookup: {
      from: "items",
      localField: "item_id",
      foreignField: "_id",
      as: "item_details"
    }
  },
  { $unwind: "$user_details" },
  { $unwind: "$item_details" }
]);
