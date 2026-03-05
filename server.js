const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
app.use(express.json());
app.use(express.static('public'));



const FILE = path.join(__dirname, "public","food.json");

app.post("/save-meal", (req, res) => {
  // res.json({success:true});

  const newMeal = req.body;

  console.log(newMeal)


  // Read existing JSON
  let meals = [];
  if (fs.existsSync(FILE)) {
    meals = JSON.parse(fs.readFileSync(FILE, "utf8"));
  }

  // Add new entry
  meals.push(newMeal);

  // Save back to file
  fs.writeFileSync(FILE, JSON.stringify(meals, null, 2));

  res.sendStatus(200);
});

// const source=path.join(__dirname,'FoodApp/food.json')
// const destination=path.join(__dirname,'public/food.json')

// fs.copyFile(source, destination, err => {
//   if (err) console.error(err);
//   else console.log('food.json synced');
// });

app.listen(3000, () => console.log("Server running on port 3000"));
