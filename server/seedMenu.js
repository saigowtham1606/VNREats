const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Menu = require("./models/Menu");

dotenv.config();

const menuData = [
    // BREAKFAST
    { dishno: 1, category: "Breakfast", dishname: "Masala Dosa", cuisine: "South Indian", price: 120 },
    { dishno: 2, category: "Breakfast", dishname: "Idli Sambar", cuisine: "South Indian", price: 90 },
    { dishno: 3, category: "Breakfast", dishname: "Poha", cuisine: "Maharashtrian", price: 80 },
    { dishno: 4, category: "Breakfast", dishname: "Aloo Paratha", cuisine: "North Indian", price: 110 },
    { dishno: 5, category: "Breakfast", dishname: "Pancakes with Honey", cuisine: "American", price: 160 },
    { dishno: 6, category: "Breakfast", dishname: "Omelette Toast", cuisine: "Continental", price: 100 },
    { dishno: 7, category: "Breakfast", dishname: "Chole Bhature", cuisine: "Punjabi", price: 130 },
    { dishno: 8, category: "Breakfast", dishname: "Upma", cuisine: "South Indian", price: 85 },
    { dishno: 9, category: "Breakfast", dishname: "Egg Benedict", cuisine: "Continental", price: 180 },
    { dishno: 10, category: "Breakfast", dishname: "French Toast", cuisine: "American", price: 150 },
    { dishno: 11, category: "Breakfast", dishname: "Vada Pav", cuisine: "Maharashtrian", price: 90 },
    { dishno: 12, category: "Breakfast", dishname: "Paneer Sandwich", cuisine: "Indian Fusion", price: 120 },
    { dishno: 13, category: "Breakfast", dishname: "Vegetable Cutlet", cuisine: "Indian", price: 100 },
    { dishno: 14, category: "Breakfast", dishname: "Avocado Toast", cuisine: "Continental", price: 190 },
    { dishno: 15, category: "Breakfast", dishname: "Cornflakes with Milk", cuisine: "Continental", price: 80 },
    { dishno: 16, category: "Breakfast", dishname: "Rava Kesari", cuisine: "South Indian", price: 100 },
    { dishno: 17, category: "Breakfast", dishname: "Egg Bhurji", cuisine: "Indian", price: 110 },
    { dishno: 18, category: "Breakfast", dishname: "Banana Smoothie Bowl", cuisine: "Fusion", price: 160 },
    { dishno: 19, category: "Breakfast", dishname: "Parsi Akuri", cuisine: "Parsi", price: 130 },
    { dishno: 20, category: "Breakfast", dishname: "Stuffed Poori with Aloo Sabzi", cuisine: "North Indian", price: 140 },

    // APPETIZER
    { dishno: 21, category: "Appetizer", dishname: "Paneer Tikka", cuisine: "Indian", price: 180 },
    { dishno: 22, category: "Appetizer", dishname: "Chicken Tikka", cuisine: "Indian", price: 220 },
    { dishno: 23, category: "Appetizer", dishname: "Hara Bhara Kabab", cuisine: "Indian", price: 150 },
    { dishno: 24, category: "Appetizer", dishname: "Spring Rolls", cuisine: "Chinese", price: 130 },
    { dishno: 25, category: "Appetizer", dishname: "Crispy Corn", cuisine: "Indo-Chinese", price: 140 },
    { dishno: 26, category: "Appetizer", dishname: "Nachos with Cheese", cuisine: "Mexican", price: 180 },
    { dishno: 27, category: "Appetizer", dishname: "Garlic Bread", cuisine: "Italian", price: 120 },
    { dishno: 28, category: "Appetizer", dishname: "Bruschetta", cuisine: "Italian", price: 150 },
    { dishno: 29, category: "Appetizer", dishname: "Fried Calamari", cuisine: "Mediterranean", price: 240 },
    { dishno: 30, category: "Appetizer", dishname: "Stuffed Mushrooms", cuisine: "Continental", price: 200 },
    { dishno: 31, category: "Appetizer", dishname: "Samosa", cuisine: "Indian", price: 80 },
    { dishno: 32, category: "Appetizer", dishname: "Fish Fingers", cuisine: "Continental", price: 230 },
    { dishno: 33, category: "Appetizer", dishname: "Cheese Balls", cuisine: "Indian Fusion", price: 160 },
    { dishno: 34, category: "Appetizer", dishname: "Tandoori Prawns", cuisine: "Indian", price: 260 },
    { dishno: 35, category: "Appetizer", dishname: "Mini Veg Quiche", cuisine: "French", price: 180 },
    { dishno: 36, category: "Appetizer", dishname: "Buffalo Wings", cuisine: "American", price: 210 },
    { dishno: 37, category: "Appetizer", dishname: "Dim Sum", cuisine: "Chinese", price: 190 },
    { dishno: 38, category: "Appetizer", dishname: "Chili Paneer", cuisine: "Indo-Chinese", price: 170 },
    { dishno: 39, category: "Appetizer", dishname: "Veg Manchurian", cuisine: "Indo-Chinese", price: 160 },
    { dishno: 40, category: "Appetizer", dishname: "Tomato Bruschetta", cuisine: "Italian", price: 130 },
    { dishno: 41, category: "Appetizer", dishname: "Falafel Balls", cuisine: "Middle Eastern", price: 150 },
    { dishno: 42, category: "Appetizer", dishname: "Onion Rings", cuisine: "American", price: 120 },
    { dishno: 43, category: "Appetizer", dishname: "Chicken Popcorn", cuisine: "American", price: 160 },
    { dishno: 44, category: "Appetizer", dishname: "Tortilla Chips & Salsa", cuisine: "Mexican", price: 110 },
    { dishno: 45, category: "Appetizer", dishname: "Gobi 65", cuisine: "South Indian", price: 140 },

    // MAIN COURSE
    { dishno: 46, category: "Main Course", dishname: "Butter Chicken", cuisine: "North Indian", price: 280 },
    { dishno: 47, category: "Main Course", dishname: "Paneer Butter Masala", cuisine: "North Indian", price: 240 },
    { dishno: 48, category: "Main Course", dishname: "Dal Makhani", cuisine: "North Indian", price: 210 },
    { dishno: 49, category: "Main Course", dishname: "Hyderabadi Biryani", cuisine: "Hyderabadi", price: 260 },
    { dishno: 50, category: "Main Course", dishname: "Mutton Rogan Josh", cuisine: "Kashmiri", price: 320 },
    { dishno: 51, category: "Main Course", dishname: "Veg Pulao", cuisine: "Indian", price: 180 },
    { dishno: 52, category: "Main Course", dishname: "Chicken Fried Rice", cuisine: "Chinese", price: 200 },
    { dishno: 53, category: "Main Course", dishname: "Veg Hakka Noodles", cuisine: "Chinese", price: 180 },
    { dishno: 54, category: "Main Course", dishname: "Pasta Alfredo", cuisine: "Italian", price: 230 },
    { dishno: 55, category: "Main Course", dishname: "Pasta Arrabbiata", cuisine: "Italian", price: 220 },
    { dishno: 56, category: "Main Course", dishname: "Margherita Pizza", cuisine: "Italian", price: 250 },
    { dishno: 57, category: "Main Course", dishname: "Pepperoni Pizza", cuisine: "Italian", price: 280 },
    { dishno: 58, category: "Main Course", dishname: "Vegetable Lasagna", cuisine: "Italian", price: 260 },
    { dishno: 59, category: "Main Course", dishname: "Grilled Salmon", cuisine: "Continental", price: 400 },
    { dishno: 60, category: "Main Course", dishname: "Stuffed Bell Peppers", cuisine: "Mexican", price: 230 },
    { dishno: 61, category: "Main Course", dishname: "Burrito Bowl", cuisine: "Mexican", price: 240 },
    { dishno: 62, category: "Main Course", dishname: "Paneer Biryani", cuisine: "Indian", price: 220 },
    { dishno: 63, category: "Main Course", dishname: "Malai Kofta", cuisine: "North Indian", price: 250 },
    { dishno: 64, category: "Main Course", dishname: "Fish Curry", cuisine: "South Indian", price: 300 },
    { dishno: 65, category: "Main Course", dishname: "Chicken Curry", cuisine: "North Indian", price: 270 },
    { dishno: 66, category: "Main Course", dishname: "Prawn Masala", cuisine: "Coastal", price: 320 },
    { dishno: 67, category: "Main Course", dishname: "Thai Green Curry", cuisine: "Thai", price: 310 },
    { dishno: 68, category: "Main Course", dishname: "Pad Thai Noodles", cuisine: "Thai", price: 260 },
    { dishno: 69, category: "Main Course", dishname: "Ramen Bowl", cuisine: "Japanese", price: 290 },
    { dishno: 70, category: "Main Course", dishname: "Sushi Platter", cuisine: "Japanese", price: 350 },
    { dishno: 71, category: "Main Course", dishname: "Beef Stroganoff", cuisine: "Russian", price: 370 },
    { dishno: 72, category: "Main Course", dishname: "Shahi Paneer", cuisine: "North Indian", price: 260 },
    { dishno: 73, category: "Main Course", dishname: "Kadai Chicken", cuisine: "North Indian", price: 270 },
    { dishno: 74, category: "Main Course", dishname: "Dal Tadka", cuisine: "Indian", price: 180 },
    { dishno: 75, category: "Main Course", dishname: "Jeera Rice", cuisine: "Indian", price: 120 },
    { dishno: 76, category: "Main Course", dishname: "Naan Basket", cuisine: "Indian", price: 150 },
    { dishno: 77, category: "Main Course", dishname: "Vegetable Curry", cuisine: "Indian", price: 200 },
    { dishno: 78, category: "Main Course", dishname: "Rajma Chawal", cuisine: "North Indian", price: 160 },
    { dishno: 79, category: "Main Course", dishname: "Chilli Garlic Noodles", cuisine: "Chinese", price: 190 },
    { dishno: 80, category: "Main Course", dishname: "Chicken Steak", cuisine: "Continental", price: 350 },

    // DESSERT
    { dishno: 81, category: "Dessert", dishname: "Gulab Jamun", cuisine: "Indian", price: 100 },
    { dishno: 82, category: "Dessert", dishname: "Rasmalai", cuisine: "Indian", price: 120 },
    { dishno: 83, category: "Dessert", dishname: "Chocolate Lava Cake", cuisine: "American", price: 180 },
    { dishno: 84, category: "Dessert", dishname: "Tiramisu", cuisine: "Italian", price: 200 },
    { dishno: 85, category: "Dessert", dishname: "Cheesecake", cuisine: "American", price: 210 },
    { dishno: 86, category: "Dessert", dishname: "Brownie with Ice Cream", cuisine: "American", price: 190 },
    { dishno: 87, category: "Dessert", dishname: "Apple Pie", cuisine: "American", price: 160 },
    { dishno: 88, category: "Dessert", dishname: "Kheer", cuisine: "Indian", price: 120 },
    { dishno: 89, category: "Dessert", dishname: "Jalebi", cuisine: "Indian", price: 100 },
    { dishno: 90, category: "Dessert", dishname: "Rasgulla", cuisine: "Bengali", price: 110 },
    { dishno: 91, category: "Dessert", dishname: "Mango Pudding", cuisine: "Thai", price: 150 },
    { dishno: 92, category: "Dessert", dishname: "Creme Brulee", cuisine: "French", price: 220 },
    { dishno: 93, category: "Dessert", dishname: "Chocolate Mousse", cuisine: "French", price: 180 },
    { dishno: 94, category: "Dessert", dishname: "Banoffee Pie", cuisine: "British", price: 190 },
    { dishno: 95, category: "Dessert", dishname: "Sundae", cuisine: "American", price: 150 },
    { dishno: 96, category: "Dessert", dishname: "Kulfi Falooda", cuisine: "Indian", price: 140 },
    { dishno: 97, category: "Dessert", dishname: "Panna Cotta", cuisine: "Italian", price: 210 },
    { dishno: 98, category: "Dessert", dishname: "Carrot Halwa", cuisine: "Indian", price: 130 },
    { dishno: 99, category: "Dessert", dishname: "Baklava", cuisine: "Turkish", price: 240 },
    { dishno: 100, category: "Dessert", dishname: "Chocolate Truffle", cuisine: "Continental", price: 200 },

    // BEVERAGE
    { dishno: 101, category: "Beverage", dishname: "Masala Chai", cuisine: "Indian", price: 80 },
    { dishno: 102, category: "Beverage", dishname: "Cold Coffee", cuisine: "Indian", price: 120 },
    { dishno: 103, category: "Beverage", dishname: "Cappuccino", cuisine: "Italian", price: 140 },
    { dishno: 104, category: "Beverage", dishname: "Espresso", cuisine: "Italian", price: 130 },
    { dishno: 105, category: "Beverage", dishname: "Latte", cuisine: "Continental", price: 150 },
    { dishno: 106, category: "Beverage", dishname: "Americano", cuisine: "American", price: 130 },
    { dishno: 107, category: "Beverage", dishname: "Iced Tea", cuisine: "Continental", price: 100 },
    { dishno: 108, category: "Beverage", dishname: "Mango Lassi", cuisine: "Indian", price: 100 },
    { dishno: 109, category: "Beverage", dishname: "Sweet Lime Soda", cuisine: "Indian", price: 90 },
    { dishno: 110, category: "Beverage", dishname: "Watermelon Juice", cuisine: "Indian", price: 110 },
    { dishno: 111, category: "Beverage", dishname: "Lemon Iced Tea", cuisine: "Continental", price: 110 },
    { dishno: 112, category: "Beverage", dishname: "Strawberry Milkshake", cuisine: "American", price: 140 },
    { dishno: 113, category: "Beverage", dishname: "Banana Milkshake", cuisine: "Indian", price: 120 },
    { dishno: 114, category: "Beverage", dishname: "Oreo Shake", cuisine: "American", price: 160 },
    { dishno: 115, category: "Beverage", dishname: "Virgin Mojito", cuisine: "Continental", price: 180 },
    { dishno: 116, category: "Beverage", dishname: "Blue Lagoon", cuisine: "Mocktail", price: 190 },
    { dishno: 117, category: "Beverage", dishname: "Fresh Lime Water", cuisine: "Indian", price: 80 },
    { dishno: 118, category: "Beverage", dishname: "Green Tea", cuisine: "Asian", price: 90 },
    { dishno: 119, category: "Beverage", dishname: "Hot Chocolate", cuisine: "American", price: 150 },
    { dishno: 120, category: "Beverage", dishname: "Cold Brew Coffee", cuisine: "American", price: 170 }
];

const seedMenu = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Menu.deleteMany({});
        await Menu.insertMany(menuData);

        console.log(`✅ ${menuData.length} menu items inserted successfully!`);

        await mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error seeding menu:", error);
        process.exit(1);
    }
};

seedMenu();