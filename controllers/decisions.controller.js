const decisionService = require('../services/decisions.service')

async function addDecisionTree(req, res) {
    const { userId, title } = req.body;
    console.log(userId, title);
    try {
        const newTree = await decisionService.createDecisionTree(userId, title);
        res.status(201).json(newTree);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create decision tree' });
    }
}

async function getDecisionTrees(req, res) {
    const userId = req.params.userId;
    try {
        const trees = await decisionService.getUserDecisionTreesWithPaths(userId);
        res.json(trees);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get decision trees' });
    }
}


async function createTreeNode(req, res) {
    const { label, score, explanation, parentId, isChosen } = req.body;
    try {
        const newNode = await decisionService.createTreeNode(label, score, explanation,parentId, isChosen);
        res.status(201).json(newNode);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create tree node' });
    }
}


async function getTree(req, res) {
    const { rootId } = req.params;
    console.log(rootId);
    try {
        const tree = await decisionService.getTreeAndNodes(rootId);
        res.status(200).json(tree);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get tree' });
    }
}

async function createUserDecision(req, res){
    const { decisionId, rootId, decisionLabel } = req.body;
    try {
        const newDecision = await decisionService.createUserDecision(decisionId, rootId, decisionLabel);
        res.status(201).json(newDecision);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user decision' });
    }
} 

async function getDecisionTreeFromUserId(req, res) {
    const { userId } = req.params;
    try {
        const decision = await decisionService.getDecisionTreeFromUserId(userId);
        res.status(200).json(decision);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get decision' });
    }
}

async function getUserDecisionByDecisionTreeId(req, res) {
    const { decisionTreeId } = req.params;
    try {
        const decision = await decisionService.getUserDecisionByDecisionTreeId(decisionTreeId);
        res.status(200).json(decision);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get decision' });
    }
}

async function getAllTreesByUserId(req, res) {
    const userId = req.params.userId;
    try {
        const trees = await decisionService.getAllTreesByUserId(userId);
        res.json(trees);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get decision trees' });
    }
}

module.exports = {
    addDecisionTree,
    getDecisionTrees,
    createTreeNode,
    getTree,
    createUserDecision,
    getDecisionTreeFromUserId,
    getUserDecisionByDecisionTreeId,
    getAllTreesByUserId
};