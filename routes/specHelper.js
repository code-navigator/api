const express = require("express"),
  router = express.Router(),
  requirement = require("./../data/models/requirement"),
  specNodes = require("./../data/models/specNode"),
  { getNestedChildren } = require("./../classes/common"),
  { getFlatten } = require("./../classes/common")


// Fetch nodes
router.get("/nodes", (req, res) => {
  specNodes.fetch()
    .then ( nodes => {
      res.send(getNestedChildren(nodes, "0"))
  })
})

// Update nodes in payload
router.put("/nodes", (req, res) => {
  var flattenedArray = getFlatten(req.body)
  specNodes.update(flattenedArray)
  requirement.update(flattenedArray)
  res.status(204).end()
})

// Delete nodes having ID
router.delete("/nodes", (req, res) => {
  var flattenedArray = getFlatten(req.body)
  specNodes.delete(flattenedArray)
  requirement.deleteByNodeId(flattenedArray)
  res.status(204).end()
})

//  Fetch requirements for current node ID
router.get("/requirements", (req, res) => {
  requirement.fetch(req.query.id).then(requirements => {
    res.send(requirements);
  })
})

// Delete requirement having ID
router.delete("/requirements", (req, res) => {
  requirement.delete(req.body);
  res.status(204).end()
})

module.exports = router;
