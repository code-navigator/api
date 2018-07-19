const requirement = require("../data/models/requirement")
const specNode = require("./../data/models/specNode")

class BuildRequirements {
  constructor (id) {
    this.id = id
    this.node = {}
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

  async getRequirements () {
    this.node = await specNode.fetch(this.parentId)
    this.node = this.node[0]
    let reqs = await requirement.fetch(this.parentId)
    if (reqs.length > 0) {
      this.addHeading()
      reqs.forEach(element => {
        element.nodeOrder = this.order++
        element.nodeId = this.id
        this.requirements.push(element)
      })
    }
    
    this.parentId = this.node.parentId
    
    if(this.parentId !== '0') {
      return await this.getRequirements()
    } else {
      return this.requirements
    }
  }
}

module.exports = BuildRequirements