const express = require("express"),
  router = express.Router(),
  requirement = require("./../data/models/requirement"),
  specNodes = require("./../data/models/specNode"),
  { getNestedChildren } = require("./../classes/common"),
  { getFlatten } = require("./../classes/common")

router.get("/nodes", (req, res) => {
  specNodes.fetchNodes()
    .then ( nodes => {
      res.send(getNestedChildren(nodes, "0"))
  })
})

// Update nodes in payload
router.put("/nodes", (req, res) => {
  var flattenedArray = getFlatten(req.body)
  specNodes.updateById(flattenedArray)
})

// Delete nodes having ID
router.delete("/nodes", (req, res) => {
  specNodes.delete(getFlatten(req.body))
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
})

// Delete requirement having ID
router.delete("/requirements", (req, res) => {
  requirement.delete(req.body);
})

module.exports = router;
