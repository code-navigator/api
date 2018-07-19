const requirement = require("../data/models/requirement")
const specNode = require("./../data/models/specNode")

class BuildRequirements {
  constructor (id) {
    this.id = id
    this.node = null
    this.order = 1
    this.parentId = id
    this.requirements = []
  }

  addHeading() {
    this.requirements.push(
      {
        id: '0',
        nodeId: this.id,
        nodeOrder: this.order++,
        description: 'Heading',
        requirement: `-----------${this.node.title.toUpperCase()} SPECIFIC REQUIREMENTS----------`
      }
    )
  }

  async getNodeRequirements () {
    let reqs = await requirement.fetch(this.parentId)
    if (reqs.length > 0) {
      this.addHeading()
      reqs.forEach(element => {
        element.nodeOrder = this.order++
        element.nodeId = this.id
        this.requirements.push(element)
      })
    }
  }

  async getNode () {
    this.node = await specNode.fetch(this.parentId)
    this.node = this.node[0]
  }

  async getRequirements () {
    // Get node for current ID
    await this.getNode()
    // Get requirements for current node
    await this.getNodeRequirements()
    
    // Bubble up to the next higher parent
    this.parentId = this.node.parentId
    
    // If the parent is not equal to the root node (i.e., id =0) ...
    if(this.parentId.trim() !== '0') {
      // ...Do recursion
      return this.getRequirements()
    } else {
      // ...Otherwise return the requirements
      return this.requirements
    }
  }
}

module.exports = BuildRequirements