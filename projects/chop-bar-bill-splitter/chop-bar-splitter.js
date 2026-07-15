"use strict";
// ===== MENU =====
// your menu items as an array of objects
const menu = new Map([
  [
    "waakye",
    {
      name: "waakye",
      price: 30,
      category: "main",
    },
  ],
  [
    "rice & stew",
    {
      name: "rice & stew",
      price: 25,
      category: "main",
    },
  ],
  [
    "banku & okro stew",
    {
      name: "banku & okro stew",
      price: 40,
      category: "main",
    },
  ],
  [
    "Sobolo",
    {
      name: "Sobolo",
      price: 15,
      category: "drink",
    },
  ],
  [
    "Malta Guinness",
    {
      name: "Malta Guinness",
      price: 10,
      category: "drink",
    },
  ],
  [
    "tilapia",
    {
      name: "tilapia",
      price: 50,
      category: "protein",
    },
  ],
  [
    "pork",
    {
      name: "pork",
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

//  Users split count -- Number of eaters
let splitCount = Number(prompt("How many people will be served? "));

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
const customerItems = order[userInput]?.items;
let userBillTotal = 0;
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

for (let userBill of customerItems) {
  userBillTotal += userBill.price;
}

// updating user total bill
order[userInput].total = userBillTotal;
console.log(order[userInput]);

// Calculating the eaters bill
let numberOfPeople = userBillTotal / splitCount;

// // User confirmation message
if (!splitCount || splitCount <= 1) {
  console.log(
    `Mr.${currentCustomer.customer}, your total for your order is ${userBillTotal}`,
  );
} else {
  console.log(
    `Mr.${currentCustomer.customer}, your total for your order is ${userBillTotal.toFixed(2)} cedis and your splitting bill is ${numberOfPeople.toFixed(2)} cedis for each.`,
  );
}
let restuarantName = " Julie's Kitchen".padStart(30, " ");
let pricing = "GH₵".padStart(25, " ");

console.log(`==================================================`);
console.log(restuarantName);
console.log(`==================================================`);
console.log(`Customer: ${currentCustomer.customer}
Table: ${currentCustomer.tableNumber}`);
console.log("--------------------------------------------------");
for (const { name, price } of order[userInput]?.items) {
  console.log(`${name}: ${pricing}${price}`);
}
console.log(`--------------------------------------------------`);
console.log(`Total:                            ${userBillTotal}`);
console.log(`Split(${splitCount})                              `);
console.log(`==================================================`);
console.log(`Thank you for Dinning!`.padStart(35, " "));
console.log(`==================================================`);
