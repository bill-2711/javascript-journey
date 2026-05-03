"use strict";
// ===== MENU =====
// your menu items as an array of objects
const menu = [
  {
    name: "waakye",
    price: 30,
    category: "main",
  },
  {
    name: "rice & stew",
    price: 25,
    category: "main",
  },
  {
    name: "banku & okro stew",
    price: 40,
    category: "main",
  },
  {
    name: "Sobolo",
    price: 15,
    category: "drink",
  },
  {
    name: "Malta Guinness",
    price: 10,
    category: "drink",
  },
  {
    name: "tilapia",
    price: 50,
    category: "protein",
  },
];

// ===== ORDERS =====
// your orders array
const order = [
  {
    customer: "Bill",
    tableNumber: 1,
    items: [],
    total: 0,
  },
  {
    customer: "Oscar",
    tableNumber: 2,
    items: [],
    total: 0,
  },
];

// ===== CUSTOMERS =====
const customers = [
  { name: "Bill", tableNumber: 1 },
  { name: "Oscar", tableNumber: 2 },
];

// DISPLAY all menu items
for (const food of menu) {
  console.log(food);
}

const [a, b, c] = menu;
console.log(a.name, b, c);
