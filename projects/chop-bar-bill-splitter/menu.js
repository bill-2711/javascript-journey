function menu(e) {
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
}

export { menu };
