const Role = require("../models/Role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error("El role no existe en la base de datos");
  }
};

const existsEmail = async (email = "") => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error("El email ya existe en la base de datos");
  }
};
const exitsUserId = async (_id = "") => {
  const existsUserId = await User.findById({ _id });
  if (!existsUserId) {
    throw new Error(`El Id ${_id} no existe en la base de datos`);
  }
};

module.exports = {
  isRoleValid,
  existsEmail,
  exitsUserId,
};
