const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tag: { 
    type: String, 
    required: true, 
    unique: true 
  },
}, {
  collection: 'tags',
  timestamps: false 
});

tagSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;