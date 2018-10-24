const express = require("express");
const router = express.Router();

router.route("/")
    .get((req, res, next) => {
        res.status(403).send("Access Denied");
    })


module.exports = router;