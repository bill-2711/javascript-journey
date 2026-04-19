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
};

// HEADER Rest operator
// NOTE rest packs element into an array
// Spread, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of  =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1, 2, [3, 4, 5]

const [firstFood, , secondFood, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(firstFood, secondFood, otherFood); // pizza RIsotto [Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// TITLE REST DESTRUCTURE -- OBJECTS
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// NOTE we use the rest pattern in functions cz
//  it doesnt limits the number of parameters
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  console.log(sum);
};
add(2, 3);
add(8, 7, 3, 4, 2, 5, 6, 2);

const x = [23, 5, 7];
add(...x);

restaurant.orderRest("mushrooms", "onions", "olives", "spinach");

// END

// corrections
function multiply(first, ...rest) {
  const sum = rest.reduce((acc, val) => acc + val, 0);
  return first * sum;
}

console.log(multiply(2, 3, 4, 5));
