const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../models/user");

const usuariosGet = async (req, res = response) => {
  //const { q, name = "not name", apikey, page = 1, limit } = req.query;
  const { limit = 5, start = 0 } = req.query;
  const query = { state: true };
  //obtenemos los usuarios de la base de datos, podemos agregar restricciones como paranmetros

  //const users = await User.find(query).skip(Number(start)).limit(Number(limit));
  //const total = await User.countDocuments(query);

  //resolvemos promesas al mismo tiempo
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(start)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;

  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.json(user);
};
const usuariosPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  //check if exist email of user

  /* const existsEmail = await User.findOne({ email });

  if (existsEmail) {
    return res.status(400).json({ msg: "El email ya existe" });
  }
*/

  //encrypt password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  //save in database
  await user.save();
  res.json(user);
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: " Patch API-controller ",
  });
};
const usuariosDelete = async (req, res = response) => {
  
  const { id } = req.params;
  //eliminacion fisica
  //const user = await User.findByIdAndRemove(id);

  //eliminacion logica
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    user,
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
