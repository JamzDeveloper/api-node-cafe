const {Router } = require('express');
const {check} = require('express-validator');


const {login} = require('../controllers/auth');
const {validateFields} = require('../middlewares/validate-fields');


const router = Router();

router.post('/login',[
    check("email","el correo es obligatorio").isEmail(),
    check("password","el password es obligatorio").not().isEmpty(),
    validateFields
],login);


module.exports = router;