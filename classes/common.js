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

function getDaysFromToday(date) {
    var today = new Date()
    var date = new Date(date + 'PST')
    var millisecondsPerDay = 24*60*60*1000
    
    return Math.round(
        Math.abs(
        (date.getTime() - today.getTime())/millisecondsPerDay
        )
    )
}

module.exports = {
    getNestedChildren: getNestedChildren,
    getFlatten: getFlatten,
    getDaysFromToday: getDaysFromToday
}