const mongoose = require('mongoose');

const userDecisionSchema = new mongoose.Schema({
  decisionTreeId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDecisionTree' },
  rootId: { type: mongoose.Schema.Types.ObjectId, ref: 'TreeNode' },
  decisionLabel: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserDecision', userDecisionSchema);
