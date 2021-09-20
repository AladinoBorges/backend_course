const DataValidator = require("./DataValidator");
const GetAllUsers = require("./GetAllUsers");
const CreateUser = require("./CreateUser");
const DeleteByLastName = require("./DeleteByLastName");

const GetUserById = require("./GetUserById");
const UpdateUserById = require("./UpdateUserById");

const Error404 = require("./Error404");

module.exports = {
  DataValidator,
  GetAllUsers,
  CreateUser,
  DeleteByLastName,
  GetUserById,
  UpdateUserById,
  Error404,
};
