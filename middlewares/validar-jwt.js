const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/user");
const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leear el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe",
      });
    }

    //verificar si el uid tiene estado activo

    if (!usuario.state) {
      return res.status(401).json({
        msg: "Token no valido - usuario con estado : false",
      });
    }

    req.usuario = usuario;
    req.uid = uid;

    next();
  } catch (err) {
    //console.log(err);
    res.status(401).json({
      msg: "token no valido",
    });
  }
  // console.log(token);
  // next();
};

module.exports = {
  validarJWT,
};
