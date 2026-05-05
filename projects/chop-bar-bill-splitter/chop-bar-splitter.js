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
  {
    name: "pork",
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
  const { name, price, category } = food;
  // console.log(`[${category}] ${name} - GH₵${price ?? "Not priced yet"}`);
}

let userInput = Number(prompt("Select user between 0 or 1"));
const currentCustomer = order?.[userInput];
console.log(`Welcome ${currentCustomer.customer}`);

let userMenu = Number(prompt("Select your menu order from the list [0 - 6]"));
const userMenuSelect = menu[userMenu];
console.log(userMenuSelect);
// function usCh(cus){
// return `${order.}`
// };
// console.log(usCh(userMenuSelect));
console.log(order[userInput]?.items.push(userMenuSelect));
