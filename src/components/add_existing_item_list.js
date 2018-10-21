import React from 'react'
import {Link } from 'react-router-dom'


const AddExistingItemList = (params) => {
    console.log('params in AddExistingItemList', params)
  return (
    <div>
      {
        params.possible.map((item, i) => {
          return (
            <div key={"possibleItem" + i}>
              <Link to={"add_existing_item/" + item.p_id}>
                {item.name}
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default AddExistingItemList
