const express = require('express');
const router = express.Router();

const catway = require('../models/catway');
const private = require('../middlewares/private');

router.get('/', private.checkJWT, async (req, res) => {
    try {
        const catways = await catway.find();
        res.render('dashboard', {catways});
    } catch (error) {
        console.error('Error fetching catways:', error);
        res.status(500).json({error: 'internal server error'});
    }
});

module.exports = router;