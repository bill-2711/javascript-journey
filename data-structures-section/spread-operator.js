"use strict";
// HEADER Spread Operator
// spread operator - for unpacking array elements at one
// expand an array into all it's element
// writting multiple element
const arr = [7, 8, 9];
const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr); // 1, 2, 7, 8, 9

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// NOTE the spread operator works on all iterables: arrays, strings, maps, sets, NOT object
// spread doesnt work on template literals, but can be used on arguments are passed into a functions or a new arrays
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3'),
// ];

// restaurant.orderPasta(...ingredients);

const str = "walker";
const letters = [...str, " ", "S."];
console.log(letters);

// Object
const newResturant = { founderIn: 1998, ...restaurant, founder: "Guiseppe" };
console.log(newResturant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy); // Ristorante Roma
console.log(restaurant.name); //
