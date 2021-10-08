const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "se quiere verificar el rol sin validar el token primero",
    });
  }

  const { role, name } = req.usuario;
  console.log(role);
  if (role != "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El usuario ${name} no es administrador`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    console.log(roles);
     
   // console.log(user);
    if (!req.usuario) {
      return res.status(500).json({
        msg: "se requiere verificar el role sin validar el token primero ",
      });
    }
    if (!roles.includes(req.usuario.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = { esAdminRole, tieneRole };
