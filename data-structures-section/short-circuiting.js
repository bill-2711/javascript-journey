console.log("------------------------- OR --------------------------");

// TITLE SHORT CIRCUITING
// Boolean(Use ANY data type, return ANY data type, short-circuiting)
// NOTE Short cicuiting -- returns truthy values, when one input is true.
// NOTE FALSY VALUES: 0, false, undefined, null, NAN, empty string ("",'',``)
// Can use it to set default values
console.log(3 || "Jonas");
console.log("" || "Jonas");
console.log(true || 0);
console.log(undefined || null);

console.log("------------------------- ? --------------------------");
// TITLE ? - IF IT EXIST
restaurant.numGuest = 23;
const guest1 = restaurant.numGuest ? restaurant.numGuest : 10;
console.log(guest1);

const guest2 = restaurant.numGuest2 ? restaurant.numGuest2 : 10;
console.log(guest2);

console.log("------------------------- AND --------------------------");
// NOTE This works with the AND Logical table operator
// false, when both inputs are false. Vice versa
// false, when one iput it false
// Returns falsy values
console.log(0 && "Jonas"); // 0
console.log(7 && "Jonas"); // Jonas
console.log("Hello" && 23 && null && "Jonas"); // null

// Pratical example
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushroom", "spinach");
}
restaurant.orderPizza && restaurant.orderPizza("mushroom", "spinach");

console.log("------------------------- ?? --------------------------");
// The ?? operator returns the right operand when the left operand is nullish
// (null or undefined), otherwise it returns the left operand.
restaurant.numGuest = 0;
const guest = restaurant.numGuest || 10;
console.log(guest);

// NUllish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuest ?? 10;
console.log(guestCorrect);
