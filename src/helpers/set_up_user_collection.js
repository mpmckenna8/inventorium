// set up the user Collections by pairing item indexes to the general user inventory

const setUpCollections = function(items, bags) {

  //console.log('need to match up items and bags.', bags)
  let doneBags = [];

  for(let collection of bags) {
  //  console.log(collection)
    let detailed_collection_items = [];
  //  detailed_collection_items.concat(collection.items);
    for(let coll_item of collection.items) {
  //    console.log(coll_item)
      let itemdetails = items.find((d) => d.p_id == coll_item[0])
    //  console.log('item Details', itemdetails)
      let itemCopy =Object.assign({}, itemdetails)

      if(itemdetails) {
        itemCopy.quantity = coll_item[1];
        detailed_collection_items.push(itemCopy)
      }


    }
    collection.items = detailed_collection_items;
    doneBags.push(collection)
  }
//  console.log('done matching items for bags', doneBags)
  return doneBags;
}


export default setUpCollections
