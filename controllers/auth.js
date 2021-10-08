const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/user");
const { generarJWT } = require("../helpers/generar-jwt");
const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //verificar si el email exites
    const usuario = await Usuario.findOne({ email });
    //console.log(usuario);
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario /password no son correctos - correo",
      });
    }
    //Si el usuario esta activo
    if (!usuario.state) {
      return res.status(400).json({
        msg: "Usuario /password no son correctos - estado:false",
      });
    }
    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      res.json({
        msg: "Usuario /password no son correctos - password",
      });
    }

    //generar jwt
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "algo salio mal",
    });
  }
};

module.exports = {
  login,
};
