const express = require("express"),
  router = express.Router(),
  requirement = require("./../data/models/requirement"),
  specNode = require("./../data/models/specNode"),
  { getNestedChildren } = require("./../classes/common")

router.get("/nodes", (req, res) => {
  specNode.fetchNodes()
    .then ( node => {
      res.send(getNestedChildren(node, "0"))
  })
})

//  Load requirements for current node ID
router.get("/requirements", (req, res) => {
  requirement.findById(req.query.id).then(requirements => {
    res.send(requirements);
  })
})

// Update requirements in payload
router.put("/requirements", (req, res) => {
  requirement.updateById(req.body);
});

// Delete requirement having ID
router.delete("/requirements", (req, res) => {
  requirement.delete(req.body);
});

module.exports = router;
