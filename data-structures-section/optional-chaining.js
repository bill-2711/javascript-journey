"use strict";

//TITLE Enhanced Object-literal
const weekdays = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];

const hours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  // ES6 enhacned object literal
  hours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex, mainIndex, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]},and ${this.mainMenu[mainIndex]}, will be delivered to ${time}, at ${address}`,
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`,
    );
  },
  orderRest(mainIngredients, ...otherIngredients) {
    console.log(mainIngredients, otherIngredients);
  },
  orderPizza(mealOne, mealTwo) {
    console.log(mealOne, mealTwo);
  },
};
// TITLE OPTIONAL CHAINING

// NOTE  USED FOR CHECKING IF A DATA EXIST
// WITHOUT THE ?, AN UNDEFINED OBJ ACCESSED WILL THROW ERROR.
// THIS RETURNS THE ACCESSED VALUE

// WITHOUT OPTIONAL CHAINING
console.log(restaurant.hours.mon?.open); // error
// WITH OPTIONAL CHAINING
console.log(restaurant.hours?.thur?.open); // 12

const days = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];

for (const day of days) {
  const open = restaurant.hours[day]?.open ?? "closed";
  console.log(
    `On ${day}, we ${restaurant.hours[day] ? "open at" : "are"} ${open}`,
  );
}
// CAN BE USED IN ARRAYS
const users = [{ name: "James", email: "james@gmail.com" }];
console.log(users[0]?.name ?? "User array empty");
