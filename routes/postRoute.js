const express = require('express')
const  verifyToken  = require('../middleware/verifyToken')
const { getPosts, getPost, addPost, updatePost, deletePost } = require('../controllers/postController')
const router =express.Router()

router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/', verifyToken,addPost);
router.post('/:id',verifyToken,updatePost);
router.delete('/:id',verifyToken,deletePost);





module.exports=router;