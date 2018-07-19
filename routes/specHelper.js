const express = require("express"),
  buildRequirements = require("./../classes/buildRequirements"),
  config = require('./../config'),
  file = require("./../data/models/file"),
  requirement = require("./../data/models/requirement"),
  router = express.Router(),
  specNodes = require("./../data/models/specNode"),
  { spawn } = require('child_process'),
  { padLeft } = require("./../classes/common"),
  { getNestedChildren } = require("./../classes/common"),
  { getFlatten } = require("./../classes/common")

// Fetch nodes
router.get("/nodes", (req, res) => {
  specNodes.fetchAll()
    .then ( nodes => {
      res.send(getNestedChildren(nodes, "0"))
  })
})

router.get("/loadspecs", async(req, res) => {
  let file = await fetchSpec(req.query.title)
  res.send(file.fileName)
})

router.get("/loadspecs/:file", (req, res) => {
  let fileName = req.params.file
  let fileId = (fileName.replace(/\.[^/.]+$/, ""))
  let directory = config.paths.filebound
    + padLeft((fileId / 1000 | 0) * 1000, 8, '0') 
    + '\\'
  
  res.sendFile(fileName, {
    root: directory
  })
})

router.get("/loadprocs", async(req, res) => {
  // var data = []
  // var file = fetchFile(req.query.title)
  let file = await fetchProc(req.query.title)
  res.send(file.fileName)
})

router.get("/loadprocs/:file", (req, res) => {
  let fileName = req.params.file
  let fileId = (fileName.replace(/\.[^/.]+$/, ""))
  let directory = config.paths.filebound
    + padLeft((fileId / 1000 | 0) * 1000, 8, '0') 
    + '\\'
  
  res.sendFile(fileName, {
    root: directory
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

router.get("/requirements/all", async(req, res) => {
  let obj = new buildRequirements(req.query.id)
  const a = await obj.getRequirements()
  console.log(a)
    res.send('TEST')
})

// Delete requirement having ID
router.delete("/requirements", (req, res) => {
  requirement.delete(req.body);
  res.status(204).end()
})

fetchSpec = async (title) => {
  var fileName,
    directory,
    extension,
    path
  var result = await file.fetchSpec(title)
  if (result) {
    fileName = result[0].DocumentID 
    directory = config.paths.filebound + padLeft((fileName / 1000 | 0) * 1000, 8, '0')
    extension = result[0].Extension
    fileName = fileName + '.' + extension
    path = directory + '\\' + fileName
    var result =  {
      directory: directory,
      fileName: fileName,
      extension: extension,
      path: path
    }
    return result
  }
}
  
  fetchProc = async (title) => {
    var fileName,
      directory,
      extension,
      path
    var result = await file.fetchProc(title)
    if (result) {
      fileName = result[0].DocumentID 
      directory = config.paths.filebound + padLeft((fileName / 1000 | 0) * 1000, 8, '0')
      extension = result[0].Extension
      fileName = fileName + '.' + extension
      path = directory + '\\' + fileName
      var result =  {
        directory: directory,
        fileName: fileName,
        extension: extension,
        path: path
      }
      return result
    }
  }

module.exports = router;
