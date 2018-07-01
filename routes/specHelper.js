const express = require("express"),
  router = express.Router(),
  requirement = require("./../data/models/requirement"),
  specNodes = require("./../data/models/specNode"),
  file = require("./../data/models/file"),
  config = require('./../config'),
  { getNestedChildren } = require("./../classes/common"),
  { getFlatten } = require("./../classes/common"),
  { padLeft } = require("./../classes/common"),
  spawn = require('child_process').spawn

// Fetch nodes
router.get("/nodes", (req, res) => {
  specNodes.fetch()
    .then ( nodes => {
      res.send(getNestedChildren(nodes, "0"))
  })
})

router.get("/test.pdf", (req, res) => {
  var data = []
  var cp = spawn('python.exe', ['c:\\test\\unoconv.py', '--stdout', '-f', 'pdf', '1000.xlsx'])

    cp.stdout.on('data', function(chunk){
      data.push(chunk);
    })

    cp.stderr.on("data", function(data) {
      console.error(data.toString());
    });

    cp.stdout.on('end', function(){
      data = Buffer.concat(data);
      // console.log(data.toString())
      res.end(data)
      //res.download(__dirname, 'test.pdf');
    })
  // var fileId
  // var filename
  // var directory

  // file.fetch(req.query.title)
    // .then(result => {
    //   fileId = result[0].documents[0].documentId
    //   fileName = fileId + '.PDF'
    //   directory = padLeft((fileId / 1000 | 0) * 1000, 8, '0')
    //   console.log(fileName)
    //   res.sendFile(fileName, {
    //     root: config.paths.filebound + '\\' + directory + '\\'
    //   })
    // })
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
