db.sales.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
]);

//? Explicação dos estágios de agregação:
//* O estágio $match filtra os documentos pelo campo status , e passam para o próximo estágio somente os documentos que têm status igual a "A".

//* O estágio $group agrupa os documentos pelo campo cust_id para calcular a soma dos valores do campo amount para cada cust_id único.
