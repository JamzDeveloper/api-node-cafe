const { Router } = require("express");
const { check } = require("express-validator");
/*
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");
const {validateFields} = require("../middlewares/validate-fields");*/
const {
  validarJWT,
  esAdminRole,
  tieneRole,
  validateFields,
} = require("../middlewares");

const {
  isRoleValid,
  existsEmail,
  exitsUserId,
} = require("../helpers/db-validators");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(exitsUserId),
    check("role", "No es un rol valido").custom(isRoleValid),
    validateFields,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
    check("email").isEmail(),
    check("email").custom(existsEmail),
    //check("role", "El role es obligatorio").isIn(['USER','ADMIN']),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  usuariosPost
);

router.patch("/", usuariosPatch);
router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole("ADMIN", "USER"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(exitsUserId),
    validateFields,
  ],
  usuariosDelete
);

module.exports = router;
