
const express = require("express");
const {  createRegister } = require(""../controllers/registerController"");

const router = express.Router();

router.post("/",createRegister);
module.exports = router;
