const express = require("express"),
  router = express.Router(),
  requirement = require("./../data/models/requirement");

//  Load requirements for current node ID
router.get("/requirements", (req, res) => {
  requirement.findById(req.query.id).then(requirements => {
    res.send(requirements);
  });
});

// Update requirements in payload
router.put("/requirements", (req, res) => {
  requirement.updateById(req.body);
});

// Delete requirement having ID
router.delete("/requirements/:id", (req, res) => {
  requirement.deleteById(req.params.id);
});

module.exports = router;
