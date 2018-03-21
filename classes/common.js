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

function getFlatten(tree) {
    const array = Array.isArray(tree) ? tree : [tree];
    return array.reduce(function(acc, value) {
      acc.push(value);
      if (value.children) {
        acc = acc.concat(getFlatten(value.children));
        delete value.children;
      }
      return acc;
    }, []);
  }


module.exports = {
    getNestedChildren: getNestedChildren,
    getFlatten: getFlatten
}