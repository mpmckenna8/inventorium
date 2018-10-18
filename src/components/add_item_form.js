import React from 'react'


const AddItemForm = ({params}) => {

  let input;
  let description = ''
  let count = 0;
  let weight = 0;
  let category = ""
  let toggleCategoryTextInput = function(changedCategory) {
    console.log('need to change category', changedCategory)
    category = changedCategory;
  }
  

  return (
    <div>
    <form id="newItemForm"
      onSubmit={e => {
        e.preventDefault()
      }
    }>

    <div className="addItemDiv">
      <label className="addLabel">Name:</label>
      <input
        className="itemInName addInput"
        ref={node => {
          input = node
        }}
      />

      </div>

      <br />
      <div className="addItemDiv">
        <label className="addLabel">description:</label>
        <input
        className="itemInputDescription addInput"
          ref={node => {
            description = node
          }}
        />

      </div>

      <br />

      <div className="addItemDiv">
        <label className="addLabel">Quantity:</label>
        <input
          className="quantin addInput"
          ref={node => {
            count = node;
          }}
          type="number"
          step="1"
          defaultValue="1"
        />
      </div>

      <br />
      <div className="addItemDiv">

        <label className="addLabel">weight:</label>
        <input
          className="weight addInput"
          ref={node => {
            weight = node;
          }}
          type="number"
          step=".1"
          defaultValue="1"

        />
      </div>

      <br />
      <div className="addItemDiv">
        <label className="addLabel">Category:</label>
          <select name="select" defaultValue="other" className="addSelect" id="catSelect" onChange={(e) => {
                //  console.log('e is', e.target.value);
                  toggleCategoryTextInput(e.target.value)
              }}>
                      <option value="clothing">Clothing</option>
                      <option value="comestible" >Comestibles</option>
                      <option value="tool">Tools</option>
                      <option value="potion">Potion</option>
                      <option value="electronics">Electronics</option>
                      <option value="other">other</option>
                  </select>
                  <input type="text" className="categoryText" placeholder="add custom category">

                  </input>
          </div>


    </form>
    </div>
  )
}

export default AddItemForm
