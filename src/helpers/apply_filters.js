// function to apply filters to an itemlist

function applyFilters(items, collections = [], filters={
    categories:[],
    collections:[],
    selected_collections: [],
    showCollections: true,
    showPositiveQuantity: true,
    showZeroQuantity: true,
    visible: false,
    visibleCategories:[]
  }
) {
  console.log('applying filters.', items)
  let filteredItems = items;
  // apply category filters

  filteredItems = items.filter( (item) => {
    console.log(filters.visibleCategories.includes( item.category ))
    return filters.visibleCategories.includes( item.category )
  })

  filteredItems = filteredItems.filter( (item) => {

    if( ! filters.showPositiveQuantity ) {
      if( item.quantity > 0 ) {
        return false
      }
    }
    else if( ! filters.showZeroQuantity ) {
      if( item.quantity < 1 ) {
        return false
      }
    }
    return true;
  })

  // don't apply collection filters if on a colleciton pages
  if(window.location.pathname.includes('usercollection') ||
    filters.selected_collections.includes('all')) {
    console.log('not applying collection filters.')
  }
  else {

    let collections = this.props.User.collections;

    filteredItems = filteredItems.filter( (item) => {

      let filterStat = false;

      for( let collection of collections ) {
        if( filters.selected_collections.includes(collection.name) ) {
          for( let collection_item of collection.items) {
            if( collection_item.p_id === item.p_id) {
            filterStat = true;
            }
          }
        }
      }
      return filterStat
    })
  }

  console.log('applyed filters.', filteredItems)

  return filteredItems;

}

module.exports = applyFilters
