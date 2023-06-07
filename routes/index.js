const express = require('express');
const Log = require('../schemas/log');
const { isLoggedIn } = require('../middlewares/auth.middleware');
const router = express.Router();

/*
    Date: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        required: true,
    },
    screen: String,
    action: String,
    param: String,
    note: String,
*/
router.post('/log', isLoggedIn, async (req, res, next)=>{
    const {screen, action, param, note} = req.body;
    const userId = res.locals.userId;
    
    try {
        await Log.create({
            userId, screen, action, param, note
        });    
        res.status(200).json({
            OK: true
        });
    } catch (error) {
        res.status(500).json({
            OK: false
        });
        next(error);
    }
    
});

module.exports = router;