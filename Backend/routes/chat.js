const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/send', authMiddleware, sendMessage);
router.get('/:chatRoom', authMiddleware, getMessages);
// authMiddleware ke wjh se inme postman me header me hm Authorization add krege 
module.exports = router;
