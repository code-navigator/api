function getNestedChildren(flatArray, parent) {
    var nestedArray = []

    for(var i in flatArray) {
        if(flatArray[i].parentId == parent) {
            var children = getNestedChildren(flatArray, flatArray[i].id)
            
            if (children.length) {
                flatArray[i].children = children
            }
            nestedArray.push(flatArray[i])
        }
    }

    return nestedArray 
}


module.exports = {
    getNestedChildren: getNestedChildren
}