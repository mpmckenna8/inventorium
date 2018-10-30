// view for adding a new collection;

import React from 'react'
import { Link } from 'react-router-dom';


const NewCollectionView = (props) => {
  let collection_types = [];
  if(props.collection_types.length > 0) {
    collection_types = props.collection_types;
  }

  return (
    <div>
      {
        collection_types.map( (coll_type, i) => {

          return (
            <div key={coll_type.name + i}>
              <Link to={"/new_user_collection/" + coll_type.coll_id}>{coll_type.name}</Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default NewCollectionView;
