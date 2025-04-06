const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.get('/:id', userController.getUserById);
router.put('/score/:id', userController.updateUserScore);

router.get('/user/leaderboard', userController.getLeaderboard);

module.exports = router;
