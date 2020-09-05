var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send("Testing Main Route");
})

router.get('/yup', (req, res) => {
    res.send("Testing Second Route");
})

module.exports = router;