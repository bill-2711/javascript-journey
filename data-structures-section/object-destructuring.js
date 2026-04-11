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
};

// HEADER  Object Destructuring

// NOTE TO extract variables from object, we've to use the exact names
// NOTE In object destructuring, the order of the element doesn't matter
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//TITLE Renaming variables extracted
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// TITLE Default Values
// NOTE A default value is a fallback value
// NOTE assigned to a variable during destructuring, used
// NOTE when the object element at that position is undefined
const { menu = [], starterMenu: starter } = restaurant;
console.log(menu, starter);

//TITLE Mutating variables
let a = 111;
let b = 999;
let d = undefined;
const obj = { a: 23, b: 7 };
({ a, b, d = 14 } = obj);
console.log(a, b, d);

// nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(`work starts at ${o}:00 am, and closes at ${c}:00 pm`);

//TITLE Applying objects destructuring  n the function called
// NOTE resturant → an object
// NOTE orderDelivery → a function stored inside that object
// NOTE () → calls (executes) the function
// NOTE {} → an argument being passed (an object)
// NOTE always add {} when calling a func inside an object with multiple para
restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

// // Default values
// restaurant.orderDelivery({
//   address: 'kwadaso-Estate, Ak-225-336-1',
//   mainIndex: 2,
// });

// NOTE CORRECTIONS
const meal = {
  eatryName: "KFC",
  firstFood: "Tea n Bread",
  secondFood: "Rice n Stew",
  thirdFood: "Banku n Okro stew",
  dishes: ["kelewele", "chips", "assorted foods"],
  userOrder: function ({ firstMeal, secondMeal, time, address }) {
    return `I visit KFC at ${time} in the morning for their ${this.dishes[firstMeal]} and ${this.dishes[secondMeal]} at ${address}`;
  },
  userOrders: function (eatryName, firstFood) {
    return `I go to ${eatryName} for their ${firstFood}`;
  },
};

console.log(
  meal.userOrder({
    time: "9:00",
    firstMeal: 1,
    secondMeal: 0,
    address: "Ahodwo",
  }),
);

const { eatryName: jointName, firstFood: order1 } = meal;
console.log(meal.userOrders(jointName, order1));

// Renaming meal
const { firstFood: Breakfast, secondFood: lunch, thirdFood: supper } = meal;
console.log(Breakfast, lunch, supper); // Tea n Bread, Rice n Stew, Banku n Okro stew

const { xi: x, yi: y } = { xi: 10, yi: 20 };
console.log(x, y);
// console.log(xi, yi);
