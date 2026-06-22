const express = require('express');
const router = express.Router();
const { getTags, getTagById, createTag, deleteTag } = require('../controllers/tag.controller');
const { validarTagById } = require('../middlewares/validacionesById.middleware')

router.get('/', getTags); // localhost:5000/tags
router.get('/:tagId', validarTagById, getTagById);
router.post('/', createTag);
router.delete('/:tagId', validarTagById, deleteTag);

module.exports = router;