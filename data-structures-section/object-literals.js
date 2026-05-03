use strict';

// Enhanced Object-literal
const weekdays = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];
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
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhacned object literal
  hours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex, mainIndex, time = '20:00', address }) {
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