// models/TreeNode.js
const mongoose = require('mongoose');

const treeNodeSchema = new mongoose.Schema({
  label: String,
  description: String,
  score: Number,
  explanation: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'TreeNode', default: null },
  isChosen: { type: Boolean, default: false },
});

module.exports = mongoose.model('TreeNode', treeNodeSchema);
