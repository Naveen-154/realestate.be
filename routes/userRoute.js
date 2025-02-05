
const express = require('express');
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController.js');
const verifyToken = require('../middleware/verifyToken.js');
const router =express.Router()
router.get("/",getUsers);
router.get("/:id", verifyToken, getUser);

router.put("/:id",verifyToken,updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports=router;