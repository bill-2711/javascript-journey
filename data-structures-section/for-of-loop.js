"use strict";

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thur: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex,
    mainIndex,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]},and ${this.mainMenu[mainIndex]}, will be delivered to ${time}, at ${address}`,
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`,
    );
  },
  orderRest: function (mainIngredients, ...otherIngredients) {
    console.log(mainIngredients, otherIngredients);
  },
  orderPizza: function (mealOne, mealTwo) {
    console.log(mealOne, mealTwo);
  },
};

// TITLE FOR OF LOOP
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
for (const item of menu) console.log(item);

// NOTE entries() - displays an array
for (const item of menu.entries()) console.log(item);

// Applying destructuring in the for of loop
for (const [key, value] of menu.entries()) console.log(`${key + 1}: ${value}`);
