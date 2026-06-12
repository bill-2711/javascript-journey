"use strict";
import { menu } from "./menu";
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
const userSelectedMenu = menu.get(userMenu);
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
let customerConfirm = "done";
let customerBill = 0;

while (customerConfirm === "done") {
  for (const { price } of me) customerBill += price;
}
console.log(customerBill);
