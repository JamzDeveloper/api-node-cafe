const { request, response } = require("express");

const usuariosGet = (req, res = response) => {
  const { q, name = "not name", apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API-controller",
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: " Put API-controller",
    id,
  });
};
const usuariosPost = (req, res = response) => {
  const body = req.body;

  res.json({
    msg: " Post API-controller ",
    body,
  });
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: " Patch API-controller ",
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: " Delete API-controller ",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
