// ? less than ($lt):
db.inventory.find({ qty: { $lt: 20 } });

// ? less or equal to ($lte):
db.inventory.find({ qty: { $lte: 20 } });

// ? greater than ($gt):
db.inventory.find({ qty: { $gt: 20 } });

// ? greater or equal to ($gte):
db.inventory.find({ qty: { $gte: 20 } });

// ? equal to ($eq), pode ser usado um simples find com a query, o resultado será o mesmo:
db.inventory.find({ qty: { $eq: 20 } }); //* ou:
db.inventory.find({ qty: 20 });

// ? not equal to ($ne):
db.inventory.find({ qty: { $ne: 20 } });

// ? in ($in):
db.inventory.find({ qty: { $in: [5, 15] } });

// ? not in ($nin):
db.inventory.find({ qty: { $nin: [5, 15] } });
