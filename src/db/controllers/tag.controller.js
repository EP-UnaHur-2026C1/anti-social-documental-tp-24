const Tag = require('../../mongoSchemas/tagSchema');

const getTags = async (_, res) => {
  const tags = await Tag.find();
  res.status(200).json(tags);
};

const getTagById = async (req, res) => {
  const tag = await Tag.findById(req.params.tagId);
  res.status(200).json(tag);
};

const createTag = async (req, res) => {
  const tag = await Tag.create(req.body);
  res.status(201).json(Tag);
};

module.exports = { getTags, getTagById, createTag };