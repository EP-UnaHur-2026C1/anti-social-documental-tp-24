const express = require('express');
const router = express.Router();
const { getTags, getTagById, createTag } = require('../controllers/tag.controller');

router.get('/', getTags);
router.get('/:tagId', getTagById);
router.post('/', createTag);

module.exports = router;