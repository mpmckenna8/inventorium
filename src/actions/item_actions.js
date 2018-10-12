// actions relating to itemList


export const EDIT_ITEM_QUANTITY = "EDIT_ITEM_QUANTITY";

export const editItemQuantity = function(itemDetails) {

  return {
    type:EDIT_ITEM_QUANTITY,
    item: itemDetails
  }
}
