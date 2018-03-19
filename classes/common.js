function getNestedChildren(flatArray, parent) {
    var nestedArray = []

    for(var i in flatArray) {
        if(flatArray[i].parentId.trim() == parent.trim()) {
            var children = getNestedChildren(flatArray, flatArray[i].id)
            
            if (children.length) {
                flatArray[i].children = children
            }
            nestedArray.push(flatArray[i])
        }
    }

    return nestedArray 
}

function flattenChildren(tree) {
    let flatten = [Object.assign({}, tree)];
    delete flatten[0][key];
  
    if (tree[key] && tree[key].length > 0) {
      return flatten.concat(tree[key]
        .map((child)=>flattenTree(child, key))
        .reduce((a, b)=>a.concat(b), [])
      );
    }

    return flatten
  };


module.exports = {
    getNestedChildren: getNestedChildren,
    flattenChildren: flattenChildren
}