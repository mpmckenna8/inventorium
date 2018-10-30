import React from 'react'
import {Link } from 'react-router-dom'


const CollectionsList = (params) => {

  let userCollections = params.collections;
  console.log('userCollecitons = ', userCollections)
  return (
    <div>
    {
      userCollections.map( (collection, i) => {

        return (
        <div key={'collectiondiv' + i}>
          <Link to={"/usercollection/" + collection.up_id}>
            {collection.name}
          </Link>
        </div>
      )
      })
    }
    </div>
  )
}


export default CollectionsList;
