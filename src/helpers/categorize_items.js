

function categorizeItems(items) {
  let itemsCategorized = {};
//  console.log(items)
  for( let item of items) {
    let categoriesDone = Object.keys(itemsCategorized);
    if( !categoriesDone.includes( (d) => item.category === d) ) {
      itemsCategorized[item.category] = items.filter( (e) => e.category === item.category )
    }
  }
//  console.log(itemsCategorized)
  return itemsCategorized
}

export default categorizeItems;
