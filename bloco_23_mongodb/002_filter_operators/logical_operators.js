// ? not ($not):
db.inventory.find({ price: { $not: { $gt: 1.99 } } });

// ? or ($or):
db.inventory.find({ $or: [{ qty: { $lt: 20 } }, { price: 10 }] });

// ? nor ($nor):
db.inventory.find({ $nor: [{ price: 1.99 }, { sale: true }] });

// ? and ($and):
db.inventory.find({
  $and: [{ price: { $ne: 1.99 } }, { price: { $exists: true } }],
});

// ! É possivel usar múltiplas expressões lógicas:
db.inventory.find({
  $and: [
    { price: { $ne: 0.99, $lt: 1.99 } },
    {
      $or: [{ sale: true }, { qty: { $lt: 20 } }],
    },
  ],
});
