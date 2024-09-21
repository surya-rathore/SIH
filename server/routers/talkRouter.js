const express = require('express');
const talkrouter = express.Router();
const talkController = require('../controllers/talkController');

talkrouter.post('/talkwithAi', talkController.talkwithAi);

module.exports = talkrouter;
