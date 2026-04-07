"use strict";

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};
// NOTE
// Destructuring - used for breaking down complex data into simple and smaller ones
// unpacking values from an array into separate variables
// Often declare the variable with "const"

// TITLE ARRAY DESTRUCTURING
const arr = ["bill", "walker", "fosuhene", 21];

const [firstName, middleName, lastName] = arr;
console.log(
  `I ${lastName} ${firstName} ${middleName} will build my portfolio.`,
);

// The array destructuring can be used in interchanging values
let [firstMeal, secondFood] = restaurant.categories;
console.log(firstMeal, secondFood); // Italian, Pizzeria

[firstMeal, secondFood] = [secondFood, firstMeal];
console.log(firstMeal, secondFood); // Pizzeria, Italian

// Calling functions using the this keyword
console.log(restaurant.order(2, 0)); // [Garlic, Pizza]

// Now we want to apply array destructuring  on the function invoked here
const [starter, main] = restaurant.order(2, 0);
console.log(starter, main); // Garlic, Pizza

// How to get nested values using array destructuring
const nestedValues = [2, 4, 6, 8, 10, [12, 14], 16];

const [i, , k, j, , [m, n]] = nestedValues;
console.log(i, k, j, [m, n]); // 2, 6, 8, [12, 14]

// How to set default values using destructuring
// Default values only replace undefined
const [p = 1, q = 1, r = 1] = [8, 9];
// r was undefined, so it is replaced by a default value : 1
console.log(p, q, r);
