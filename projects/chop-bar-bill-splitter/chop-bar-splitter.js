"use strict";
// ===== MENU =====
// your menu items as an array of objects
const menu = new Map([
  [
    "waakye",
    {
      price: 30,
      category: "main",
    },
  ],
  [
    "rice & stew",
    {
      price: 25,
      category: "main",
    },
  ],
  [
    "banku & okro stew",
    {
      price: 40,
      category: "main",
    },
  ],
  [
    "Sobolo",
    {
      price: 15,
      category: "drink",
    },
  ],
  [
    "Malta Guinness",
    {
      price: 10,
      category: "drink",
    },
  ],
  [
    "tilapia",
    {
      price: 50,
      category: "protein",
    },
  ],
  [
    "pork",
    {
      price: 50,
      category: "protein",
    },
  ],
]);

// ===== ORDERS =====
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
for (const [key, value] of menu.entries()) {
  const { price, category } = value;
  console.log(`[${category}] ${key} - GH₵${price ?? " Not priced yet"}`);
}

let userInput = Number(prompt("Select user between 0 or 1"));
let userMenu = prompt(
  "Pick your orders: waakye, pork, tilapia, Sobolo, Malta Guinness, banku & okro stew and rice & stew",
);

// Selecting current customer — smart use of optional chaining
const currentCustomer = order?.[userInput];

// User selected food
let userSelectedMenu = menu.get(userMenu);
console.log(userSelectedMenu);

// Customer order list
order[userInput]?.items.push(userSelectedMenu);
console.log(order[userInput]?.items);

// // User confirmation message
console.log(
  `Mr.${currentCustomer.customer}, you selected our ${menu.get(userMenu)?.category} ${userMenu} and it's GH₵${menu.get(userMenu)?.price}.`,
);

//TO BE WORKED ON
const me = order[userInput]?.items;
let customerConfirm = prompt("Do you want to order more? yes or done");

while (customerConfirm === "yes") {
  userMenu = prompt(
    "Pick your orders: waakye, pork, tilapia, Sobolo, Malta Guinness, banku & okro stew and rice & stew",
  );

  userSelectedMenu = menu.get(userMenu);
  order[userInput]?.items.push(userSelectedMenu);
  console.log(order[userInput]?.items);
  customerConfirm = prompt("Do you want to order more? yes or done");

  if (customerConfirm === "done") break;
}
