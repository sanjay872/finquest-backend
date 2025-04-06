const express = require('express');
const router = express.Router();
const decisionController = require('../controllers/decisions.controller');


// creating user and decision relationship
router.post('/trees',decisionController.addDecisionTree);

// creating node and tree
router.post('/nodes', decisionController.createTreeNode);

// create decision and tree relationship
router.post('/userDecision', decisionController.createUserDecision);

// get decision tree from user id for decision tree id
router.get('/trees/user/:userId', decisionController.getDecisionTreeFromUserId);

// get user decision by decision tree id for tree root id
router.get('/userDecision/:decisionTreeId', decisionController.getUserDecisionByDecisionTreeId);

// reading trees and nodes by passing root id of the tree
router.get('/trees/:rootId', decisionController.getTree)

// get all decision trees of a user
router.get('/trees/all/:userId', decisionController.getAllTreesByUserId);

// I don't know why I created this!
// get all decision trees of a user with paths
// router.get('/trees/user/:userId', decisionController.getDecisionTrees);

module.exports = router;