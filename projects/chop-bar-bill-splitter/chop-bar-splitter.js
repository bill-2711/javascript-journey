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
let userInput = Number(prompt("Select user between 0 or 1"));
let userMenu = Number(prompt("Select your menu order from the list [0 - 6]"));

let userBill = 0;
// DISPLAY all menu items
for (const food of menu) {
  const { name, price, category } = food;
  console.log(`[${category}] ${name} - GH₵${price ?? "Not priced yet"}`);
  userBill += menu[userMenu]?.price;
}
// Selecting current customer — smart use of optional chaining
const currentCustomer = order?.[userInput];

// Welcoming the customer — clean template literal
console.log(`Welcome ${currentCustomer.customer}`);

// Selecting menu item — correct array access
const userMenuSelect = menu[userMenu];
// for (const [key, value] of Object.entries(userMenuSelect)) {
//   console.log(key, value);
// }

// Adding to order — correct use of push
order[userInput]?.items.push(userMenuSelect);
console.log(order[userInput]?.items);

// User confirmation message
console.log(
  `Mr.${currentCustomer.customer}, you selected our ${menu[userMenu]?.category} ${menu[userMenu]?.name} and it's GH₵${menu[userMenu]?.price}.`,
);

// User total bill
console.log(`Your total bill: ${userBill}`);
